import { left, right, type Either } from "@/core/either";
import type { Encrypter } from "../cryptography/encrypter";
import type { HashComparer } from "../cryptography/hash-comparer";
import type { ClientRepository } from "../repositories/client-repository";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

interface AuthenticateClienteRequest {
  email: string;
  password: string;
}
type AuthenticateClienteResponse = Either<
  WrongCredentialsError,
  { accessToken: string }
>;
export class AuthenticateClientUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
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
      client.password
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
