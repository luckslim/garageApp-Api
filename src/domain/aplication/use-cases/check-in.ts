import { right, type Either } from '@/core/either';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { CheckIn } from '@/domain/enterprise/entities/check-in';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CheckInRepository } from '../repositories/check-in-repository';
import { Inject, Injectable } from '@nestjs/common';

interface CheckInClientUseCaseRequest {
  clientId: string;
  typeVehicle: string;
  vehicleId: string;
  vehiclePhoto: string;
}
type CheckInClientUseCaseResponse = Either<
  WrongCredentialsError,
  { checkIn: CheckIn }
>;
@Injectable()
export class CheckInClientUseCase {
  constructor(
    @Inject(CheckInRepository) private checkInRepository: CheckInRepository,
  ) {}
  async execute({
    clientId,
    vehicleId,
    vehiclePhoto,
    typeVehicle,
  }: CheckInClientUseCaseRequest): Promise<CheckInClientUseCaseResponse> {
    const checkInId = CheckIn.create({
      clientId: new UniqueEntityID(clientId),
      vehicleId,
      vehiclePhoto,
      typeVehicle,
    });
    const checkIn = await this.checkInRepository.create(checkInId);
    return right({
      checkIn,
    });
  }
}
