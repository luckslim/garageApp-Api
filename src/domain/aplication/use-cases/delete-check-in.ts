import { left, right, type Either } from '@/core/either';
import { CheckInRepository } from '../repositories/check-in-repository';
import { NotAllowedError } from './errors/Not-allowed-error';
import { Inject, Injectable } from '@nestjs/common';
import { WrongCredentialsError } from './errors/wrong-credentials-error';

interface DeleteCheckInClientUseCaseRequest {
  id: string;
  clientId: string;
}
type DeleteCheckInClientUseCaseResponse = Either<NotAllowedError| WrongCredentialsError, null>;
@Injectable()
export class DeleteCheckInClientUseCase {
  constructor(
    @Inject(CheckInRepository) private checkInRepository: CheckInRepository,
  ) {}
  async execute({
    id,
    clientId,
  }: DeleteCheckInClientUseCaseRequest): Promise<DeleteCheckInClientUseCaseResponse> {
    const checkIn = await this.checkInRepository.findByCheckInId(id);
    if (!checkIn) {
      return left(new NotAllowedError());
    }
    if (clientId !== checkIn.clientId) {
      return left(new WrongCredentialsError());
    }
    await this.checkInRepository.delete(id)
    return right(null);
  }
}
