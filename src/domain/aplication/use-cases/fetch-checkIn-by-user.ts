import { ClientRepository } from '../repositories/client-repository';
import { Either, left, right } from '@/core/either';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { CheckIn } from '@/domain/enterprise/entities/check-in';
import { CheckInRepository } from '../repositories/check-in-repository';
import { NotAllowedError } from './errors/Not-allowed-error';

interface FetchCheckInByUserUseCaseRequest {
  email: string;
}
type FetchCheckInByUserUseCaseResponse = Either<
  WrongCredentialsError,
  { checkIn: CheckIn[] }
>;

export class FetchCheckInByUserUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private clientRepository: ClientRepository,
  ) {}
  async execute({
    email,
  }: FetchCheckInByUserUseCaseRequest): Promise<FetchCheckInByUserUseCaseResponse> {
    const user = await this.clientRepository.findByEmail(email);
    if (!user) {
      return left(new NotAllowedError());
    }
    const checkIn = await this.checkInRepository.findByAll();
    return right({ checkIn });
  }
}
