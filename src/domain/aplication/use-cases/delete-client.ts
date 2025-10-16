import { left, right, type Either } from "@/core/either";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/Not-allowed-error";
import { Inject, Injectable } from "@nestjs/common";
import { ClientRepository } from "../repositories/client-repository";

interface DeleteClientUseCaseRequest {
  id:string
}
type DeleteClientUseCaseResponse = Either<WrongCredentialsError, null>;
@Injectable()
export class DeleteClientUseCase {
  constructor(@Inject(ClientRepository) private clientRepository:ClientRepository) {}
  async execute({
    id
  }: DeleteClientUseCaseRequest): Promise<DeleteClientUseCaseResponse> {
    const client = await this.clientRepository.findById(id)
    if(!client){
        return left(new NotAllowedError())
    }
    if(id!==client.id?.toString()){
        return left(new NotAllowedError())
    }
    await this.clientRepository.deleteByEmail(client.email)
    return right(null)
  }
}
