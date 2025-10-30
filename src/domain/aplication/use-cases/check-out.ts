import { left, right, type Either } from '@/core/either';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { CheckIn } from '@/domain/enterprise/entities/check-in';
import { CheckInRepository } from '../repositories/check-in-repository';
import { Inject, Injectable } from '@nestjs/common';
import { CheckInFiles } from '@/domain/enterprise/entities/checkIn-file';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CheckInFileWatchedList } from '@/domain/enterprise/entities/checkIn-file-watched-list';

interface CheckOutUseCaseRequest {
  id: string;
  clientId: string;
  checkOut: Date;
}
type CheckOutUseCaseResponse = Either<
  WrongCredentialsError,
  { checkIn: CheckIn }
>;
@Injectable()
export class CheckOutUseCase {
  constructor(
    @Inject(CheckInRepository) private checkInRepository: CheckInRepository,
  ) {}
  async execute({
    id,
    clientId,
    checkOut,
  }: CheckOutUseCaseRequest): Promise<CheckOutUseCaseResponse> {
    const checkIn = await this.checkInRepository.findByCheckIn(id);
    if (!checkIn) {
      return left(new WrongCredentialsError());
    }
    if (checkIn.clientId !== clientId) {
      return left(new WrongCredentialsError());
    }
    checkIn.checkOutAt = checkOut;
    const saveCheckOut = await this.checkInRepository.checkOut(checkIn)
    return right({ checkIn });
  }
}
