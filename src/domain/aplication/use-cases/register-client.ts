import { Client } from "@/domain/enterprise/entities/client";
import { ClientRepository } from "../repositories/client-repository";
import { Inject, Injectable } from "@nestjs/common";

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
  constructor(@Inject(ClientRepository) private clientRepository: ClientRepository) {}
  async execute({
    name,
    email,
    password,
  }: RegisterClientUseCaseRequest): Promise<RegisterClientUseCaseResponse> {
    const clientId = Client.create({
      name,
      email,
      password,
    });
    const client = await this.clientRepository.create(clientId);
    return {
      client,
    };
  }
}
