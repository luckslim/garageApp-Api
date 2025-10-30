import { InMemoryCheckInRepository } from '../../../../test/repositories/in-memory-check-in-repository';
import { CheckInClientUseCase } from './check-in';
import { MakeCheckIn } from '../../../../test/factories/make-checkIn';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryCheckInFilesRepository } from 'test/repositories/in-memory-check-in-files-repository';
import { makeClient } from 'test/factories/make-client';
import { CheckOutUseCase } from './check-out';

let inMemoryCheckInRepository: InMemoryCheckInRepository;
let inMemoryCheckInFilesRepository: InMemoryCheckInFilesRepository;
let sut: CheckOutUseCase;

describe('create checkOut', () => {
  beforeEach(() => {
    inMemoryCheckInFilesRepository = new InMemoryCheckInFilesRepository();
    inMemoryCheckInRepository = new InMemoryCheckInRepository(
      inMemoryCheckInFilesRepository,
    );

    sut = new CheckOutUseCase(inMemoryCheckInRepository);
  });
  it('should be able to register a checkOut', async () => {
    const user = makeClient();
    const checkIn = MakeCheckIn({
      clientId: user.id.toString(),
    });
    inMemoryCheckInRepository.items.push(checkIn);
    const result = await sut.execute({
        id:checkIn.id.toString(),
        checkOut: new Date(),
        clientId: user.id.toString()
    })
    expect(result.isRight()).toBe(true)
  });
});
