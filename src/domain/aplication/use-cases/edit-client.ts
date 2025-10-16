import { left, right, type Either } from "@/core/either";
import { ClientRepository } from "../repositories/client-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/Not-allowed-error";
import { Client } from "@/domain/enterprise/entities/client";
import { Inject, Injectable } from "@nestjs/common";

interface EditClientUseCaseRequest {
  id:string
  name: string;
  email: string;
  password: string;
}
type EditClientUseCaseResponse = Either<
  NotAllowedError,
  { client: Client }
>;
@Injectable()
export class EditClientUseCase {
  constructor(@Inject(ClientRepository) private clientRepository: ClientRepository) {}
  async execute({
    id,
    name,
    email,
    password,
  }: EditClientUseCaseRequest): Promise<EditClientUseCaseResponse> {
    const client = await this.clientRepository.findById(id);
    //console.log(client)

    if (!client) {
      return left(new NotAllowedError());
    }

    // 🔧 Corrigido
    if (id.toString() !== client.id.toString()) {
      return left(new NotAllowedError());
    }
    client.name = name
    client.password = password
    client.email = email
    await this.clientRepository.save(client);
    return right({ client });
  }
}
