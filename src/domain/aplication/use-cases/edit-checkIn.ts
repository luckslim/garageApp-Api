import { left, right, type Either } from '@/core/either';
import { NotAllowedError } from './errors/Not-allowed-error';
import { Injectable } from '@nestjs/common';
import { CheckInFileWatchedList } from '@/domain/enterprise/entities/checkIn-file-watched-list';
import { CheckInRepository } from '../repositories/check-in-repository';
import { CheckIn } from '@/domain/enterprise/entities/check-in';
import { CheckInFilesRepository } from '../repositories/check-in-files-repository';
import { CheckInFiles } from '@/domain/enterprise/entities/checkIn-file';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface EditCheckInUseCaseRequest {
  id: string;
  clientId: string;
  typeVehicle: string;
  vehicleId: string;
  fileId: string[];
}
type EditCheckInUseCaseResponse = Either<NotAllowedError, { checkIn: CheckIn }>;
@Injectable()
export class EditCheckInUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private checkInFilesRepository: CheckInFilesRepository,
  ) {}
  async execute({
    id,
    clientId,
    typeVehicle,
    vehicleId,
    fileId,
  }: EditCheckInUseCaseRequest): Promise<EditCheckInUseCaseResponse> {

    const checkIn = await this.checkInRepository.findByCheckInId(id);

    if (!checkIn) {
      return left(new NotAllowedError());
    }

    if (clientId.toString() !== checkIn.clientId.toString()) {
      return left(new NotAllowedError());
    }

    const currentCheckInFileRepository =
      await this.checkInFilesRepository.findManyCheckInId(id);

    const checkInFileList = new CheckInFileWatchedList(
      currentCheckInFileRepository,
    );

    const checkInFiles = fileId.map((fileId) => {
      return CheckInFiles.create({
        fileId: new UniqueEntityID(fileId),
        checkInId: checkIn.id,
      });
    });

    checkInFileList.update(checkInFiles)

    checkIn.vehicleId = vehicleId;
    checkIn.typeVehicle = typeVehicle;
    checkIn.file = checkInFileList

    await this.checkInRepository.save(checkIn);
    
    return right({ checkIn });
  }
}
