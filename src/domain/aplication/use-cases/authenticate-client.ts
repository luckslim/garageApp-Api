import { left, right, type Either } from '@/core/either';
import { Encrypter } from '../cryptography/encrypter';
import { HashComparer } from '../cryptography/hash-comparer';
import { ClientRepository } from '../repositories/client-repository';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { Inject, Injectable } from '@nestjs/common';

interface AuthenticateClienteRequest {
  email: string;
  password: string;
}
type AuthenticateClienteResponse = Either<
  WrongCredentialsError,
  { accessToken: string }
>;
@Injectable()
export class AuthenticateClientUseCase {
  constructor(
    @Inject(ClientRepository) private clientRepository: ClientRepository,
    @Inject(HashComparer) private hashComparer: HashComparer,
    @Inject(Encrypter) private encrypter: Encrypter,
  ) {}
  async execute({
    email,
    password,
  }: AuthenticateClienteRequest): Promise<AuthenticateClienteResponse> {
    const client = await this.clientRepository.findByEmail(email);
    if (!client) {
      return left(new WrongCredentialsError());
    }
    const IsPasswordValid = await this.hashComparer.compare(
      password,
      client.password,
    );
    if (!IsPasswordValid) {
      return left(new WrongCredentialsError());
    }
    const accessToken = await this.encrypter.encrypt({
      sub: client.id.toString(),
    });
    return right({
      accessToken,
    });
  }
}
