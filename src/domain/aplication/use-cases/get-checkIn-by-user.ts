import { Client } from '@/domain/enterprise/entities/client';
import { ClientRepository } from '../repositories/client-repository';
import { Inject, Injectable } from '@nestjs/common';
import { HashGenerator } from '../cryptography/hash-generator';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CheckIn } from '@/domain/enterprise/entities/check-in';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { Either, left, right } from '@/core/either';
import { CheckInRepository } from '../repositories/check-in-repository';
import { ResourceNotFoundError } from './errors/Resource-not-found-error';

interface GetCheckInByUserUseCaseRequest {
  clientId: string;
  page: number
}
type GetCheckInByUserUseCaseResponse = Either<
  WrongCredentialsError,
  { checkIn: CheckIn[] }
>;
@Injectable()
export class GetCheckInByUserUseCase {
  constructor(
    @Inject(CheckInRepository) private checkInRepository: CheckInRepository,
  ) {}
  async execute({
    clientId,
    page
  }: GetCheckInByUserUseCaseRequest): Promise<GetCheckInByUserUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(clientId, {page});
    if (!checkIn) {
      return left(new ResourceNotFoundError());
    }
    return right({checkIn})
  }
}
