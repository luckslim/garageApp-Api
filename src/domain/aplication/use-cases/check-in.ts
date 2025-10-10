import { right, type Either } from "@/core/either";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { CheckIn } from "@/domain/enterprise/entities/check-in";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import type { CheckInRepository } from "../repositories/check-in-repository";

interface CheckInClientUseCaseRequest {
  clientId: string;
  typeVehicle: string;
  vehicleId: string;
  vehiclePhoto: string;
  checkInAt: Date;
  checkOutAt: Date;
}
type CheckInClientUseCaseResponse = Either<
  WrongCredentialsError,
  { checkIn: CheckIn }
>;

export class CheckInClientUseCase {
  constructor(private checkInRepository: CheckInRepository) {}
  async execute({
    clientId,
    vehicleId,
    vehiclePhoto,
    typeVehicle,
    checkInAt,
    checkOutAt,
  }: CheckInClientUseCaseRequest): Promise<CheckInClientUseCaseResponse> {
    const checkInId = CheckIn.create({
      clientId: new UniqueEntityID(clientId),
      vehicleId,
      vehiclePhoto,
      typeVehicle,
      checkInAt,
      checkOutAt,
    });
    const checkIn = await this.checkInRepository.create(checkInId);
    return right({
      checkIn,
    });
  }
}
