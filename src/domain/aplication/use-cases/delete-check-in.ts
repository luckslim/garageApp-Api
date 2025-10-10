import { left, right, type Either } from "@/core/either";
import type { CheckInRepository } from "../repositories/check-in-repository";
import { NotAllowedError } from "./errors/Not-allowed-error";

interface DeleteCheckInClientUseCaseRequest {
  clientId: string;
  vehicleId: string;
}
type DeleteCheckInClientUseCaseResponse = Either<NotAllowedError, null>;

export class DeleteCheckInClientUseCase {
  constructor(private checkInRepository: CheckInRepository) {}
  async execute({
    clientId,
    vehicleId,
  }: DeleteCheckInClientUseCaseRequest): Promise<DeleteCheckInClientUseCaseResponse> {
    const client = await this.checkInRepository.findById(vehicleId);
    if (!client) {
      return left(new NotAllowedError());
    }
    if (client.clientId?.toString() !== clientId) {
      return left(new NotAllowedError());
    }
    await this.checkInRepository.delete(client);
    return right(null);
  }
}
