import { left, right, type Either } from "@/core/either";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/Not-allowed-error";
import { Inject, Injectable } from "@nestjs/common";
import { ClientRepository } from "../repositories/client-repository";

interface DeleteClientUseCaseRequest {
  clientId: string;
  email:string
}
type DeleteClientUseCaseResponse = Either<WrongCredentialsError, null>;
@Injectable()
export class DeleteClientUseCase {
  constructor(@Inject(ClientRepository) private clientRepository:ClientRepository) {}
  async execute({
    clientId,
    email
  }: DeleteClientUseCaseRequest): Promise<DeleteClientUseCaseResponse> {
    const client = await this.clientRepository.findByEmail(email)
    if(!client){
        return left(new NotAllowedError())
    }
    if(clientId!==client.clientId?.toString()){
        return left(new NotAllowedError())
    }
    await this.clientRepository.deleteByEmail(client.email)
    return right(null)
  }
}
