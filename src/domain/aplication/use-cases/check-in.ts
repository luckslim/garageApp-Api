import { right, type Either } from '@/core/either';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { CheckIn } from '@/domain/enterprise/entities/check-in';
import { CheckInRepository } from '../repositories/check-in-repository';
import { Inject, Injectable } from '@nestjs/common';
import { CheckInFiles } from '@/domain/enterprise/entities/checkIn-file';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface CheckInClientUseCaseRequest {
  clientId: string;
  typeVehicle: string;
  vehicleId: string;
  vehiclePhoto: string;
  fileIds: string[];
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
    fileIds,
  }: CheckInClientUseCaseRequest): Promise<CheckInClientUseCaseResponse> {
    const checkInId = CheckIn.create({
      clientId,
      vehicleId,
      vehiclePhoto,
      typeVehicle,
    });
    const checkInFiles = fileIds.map((fileId) => {
      return CheckInFiles.create({
        fileId: new UniqueEntityID(fileId),
        checkInId: checkInId.id,
      });
    });
    
    checkInId.file = checkInFiles
    const checkIn = await this.checkInRepository.create(checkInId);
    return right({
      checkIn,
    });
  }
}
