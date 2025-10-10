import { Client } from "@/domain/enterprise/entities/client";
import type { ClientRepository } from "../repositories/client-repository";

interface RegisterClientUseCaseRequest {
  name: string;
  email: string;
  password: string;
}
interface RegisterClientUseCaseResponse {
  client: Client;
}
export class RegisterClientUseCase {
  constructor(private clientRepository: ClientRepository) {}
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
