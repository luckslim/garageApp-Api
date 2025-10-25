import { InMemoryCheckInRepository } from '../../../../test/repositories/in-memory-check-in-repository';
import { MakeCheckIn } from '../../../../test/factories/make-checkIn';
import { DeleteCheckInClientUseCase } from './delete-check-in';
import { InMemoryClientRepository } from '../../../../test/repositories/in-memory-clients-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { WrongCredentialsError } from './errors/wrong-credentials-error';
import { InMemoryCheckInFilesRepository } from 'test/repositories/in-memory-check-in-files-repository';
import { MakeCheckInFile } from 'test/factories/make-checkIn-files';

let inMemoryCheckInRepository: InMemoryCheckInRepository;
let inMemoryClientRepository: InMemoryClientRepository;
let inMemoryCheckInFilesRepository: InMemoryCheckInFilesRepository;
let sut: DeleteCheckInClientUseCase;

describe('delete CheckIn', () => {
  beforeEach(() => {
    inMemoryCheckInFilesRepository = new InMemoryCheckInFilesRepository();
    inMemoryCheckInRepository = new InMemoryCheckInRepository(inMemoryCheckInFilesRepository);
    inMemoryClientRepository = new InMemoryClientRepository();
    sut = new DeleteCheckInClientUseCase(inMemoryCheckInRepository);
  });
  it('should be able to delete a checkIn', async () => {
    const checkInId = MakeCheckIn({
      vehicleId: 'carro-1234',
    });
    inMemoryCheckInRepository.items.push(checkInId);

    inMemoryCheckInFilesRepository.items.push(
      MakeCheckInFile({
        checkInId: checkInId.id,
        fileId: new UniqueEntityID('1'),
      }),
      MakeCheckInFile({
        checkInId: checkInId.id,
        fileId: new UniqueEntityID('2'),
      }),
    );
    const result = await sut.execute({
      id: checkInId.id.toString(),
      clientId: checkInId.clientId,
    });
    expect(inMemoryCheckInRepository.items).toHaveLength(0);
    expect(inMemoryCheckInFilesRepository.items).toHaveLength(0);
  });
  it('should not be able to delete another checkIn', async () => {
    const checkInId = MakeCheckIn({
      vehicleId: 'carro-1234',
    });
    inMemoryCheckInRepository.items.push(checkInId);
    const result = await sut.execute({
      id: checkInId.id.toString(),
      clientId: new UniqueEntityID().toString(),
    });
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });
});
