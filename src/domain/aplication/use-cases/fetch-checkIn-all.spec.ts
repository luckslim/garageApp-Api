import { InMemoryCheckInRepository } from '../../../../test/repositories/in-memory-check-in-repository';
import { MakeCheckIn } from '../../../../test/factories/make-checkIn';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { FetchCheckInAllUseCase } from './fetch-checkIn-all';

let inMemoryCheckInRepository: InMemoryCheckInRepository;
let sut: FetchCheckInAllUseCase;

describe('Fetch checkIn All', () => {
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository();
    sut = new FetchCheckInAllUseCase(inMemoryCheckInRepository);
  });
  it('should be able to fetch a checkIn All', async () => {
    const checkIn = MakeCheckIn({
      clientId: new UniqueEntityID(),
    });

    inMemoryCheckInRepository.items.push(checkIn);

    const result = await sut.execute({});
    expect(result).toBeTruthy();
    expect(inMemoryCheckInRepository.items[0]).toBeTruthy();
  });
});
