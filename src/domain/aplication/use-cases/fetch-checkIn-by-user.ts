import { ClientRepository } from '../repositories/client-repository';
import { Either, left, right } from '@/core/either';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { CheckIn } from '@/domain/enterprise/entities/check-in';
import { CheckInRepository } from '../repositories/check-in-repository';
import { NotAllowedError } from './errors/Not-allowed-error';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface FetchCheckInByUserUseCaseRequest {
  clientId: UniqueEntityID;
  page: number;
}
type FetchCheckInByUserUseCaseResponse = Either<
  WrongCredentialsError,
  { checkIn: CheckIn }
>;

export class FetchCheckInByUserUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private clientRepository: ClientRepository,
  ) {}
  async execute({
    clientId,
    page,
  }: FetchCheckInByUserUseCaseRequest): Promise<FetchCheckInByUserUseCaseResponse> {
    const user = await this.clientRepository.findById(clientId);
    if (!user) {
      return left(new NotAllowedError());
    }
    const checkIn = await this.checkInRepository.findById(clientId);
    if (!checkIn) {
      return left(new WrongCredentialsError());
    }
    return right({ checkIn });
  }
}
