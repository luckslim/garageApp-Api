import { left, right, type Either } from "@/core/either";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import type { ClientRepository } from "../repositories/client-repository";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/Not-allowed-error";
import { Client } from "@/domain/enterprise/entities/client";

interface EditClientUseCaseRequest {
  clientId: string;
  name: string;
  email: string;
  password: string;
}
type EditClientUseCaseResponse = Either<
  NotAllowedError,
  { client: Client }
>;

export class EditClientUseCase {
  constructor(private clientRepository: ClientRepository) {}
  async execute({
    clientId,
    name,
    email,
    password,
  }: EditClientUseCaseRequest): Promise<EditClientUseCaseResponse> {
    const client = await this.clientRepository.findByEmail(email);
    if (!client) {
      return left(new NotAllowedError());
    }
    if (clientId !== client.clientId?.toString()) {
      return left(new NotAllowedError());
    }
    client.name = name
    //client.changeName(name);
    // client.changeEmail(email);
    // client.changePassword(password);
    client.password = password
    client.email = email
    await this.clientRepository.save(client);

    return right({ client });
  }
}
