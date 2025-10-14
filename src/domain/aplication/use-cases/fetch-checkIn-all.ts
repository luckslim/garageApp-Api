import { CheckInRepository } from '../repositories/check-in-repository';

interface FetchCheckInAllUseCaseRequest {}
interface FetchCheckInAllUseCaseResponse {}

export class FetchCheckInAllUseCase {
  constructor(private checkInRepository: CheckInRepository) {}
  async execute({}: FetchCheckInAllUseCaseRequest): Promise<FetchCheckInAllUseCaseResponse> {
    const checkIns = await this.checkInRepository.findByAll();
    return checkIns;
  }
}
