import { left, right, type Either } from "@/core/either";
import type { CheckInRepository } from "../repositories/check-in-repository";
import { NotAllowedError } from "./errors/Not-allowed-error";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface DeleteCheckInClientUseCaseRequest {
  clientId: UniqueEntityID;
  vehicleId: string;
}
type DeleteCheckInClientUseCaseResponse = Either<NotAllowedError, null>;

export class DeleteCheckInClientUseCase {
  constructor(private checkInRepository: CheckInRepository) {}
  async execute({
    clientId,
    vehicleId,
  }: DeleteCheckInClientUseCaseRequest): Promise<DeleteCheckInClientUseCaseResponse> {
    const client = await this.checkInRepository.findById(clientId);
    if (!client) {
      return left(new NotAllowedError());
    }
    if (client.clientId !== clientId) {
      return left(new NotAllowedError());
    }
    await this.checkInRepository.delete(client);
    return right(null);
  }
}
