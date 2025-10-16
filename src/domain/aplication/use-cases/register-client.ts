import { Client } from '@/domain/enterprise/entities/client';
import { ClientRepository } from '../repositories/client-repository';
import { Inject, Injectable } from '@nestjs/common';
import { HashGenerator } from '../cryptography/hash-generator';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface RegisterClientUseCaseRequest {
  name: string;
  email: string;
  password: string;
}
interface RegisterClientUseCaseResponse {
  client: Client;
}
@Injectable()
export class RegisterClientUseCase {
  constructor(
    @Inject(ClientRepository) private clientRepository: ClientRepository,
    @Inject(HashGenerator) private hashGenerator : HashGenerator
  ) {}
  async execute({
    name,
    email,
    password,
  }: RegisterClientUseCaseRequest): Promise<RegisterClientUseCaseResponse> {
    const hashedPassword = await this.hashGenerator.hash(password);
    const clientId = Client.create({
      clientId: new UniqueEntityID(),
      name,
      email,
      password: hashedPassword,
    });

    const client = await this.clientRepository.create(clientId);
    return {
      client,
    };
  }
}
