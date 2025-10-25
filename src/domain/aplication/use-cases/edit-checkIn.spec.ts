import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { MakeCheckIn } from 'test/factories/make-checkIn';
import { InMemoryCheckInRepository } from 'test/repositories/in-memory-check-in-repository';
import { EditCheckInUseCase } from './edit-checkIn';
import { InMemoryCheckInFilesRepository } from 'test/repositories/in-memory-check-in-files-repository';
import { MakeCheckInFile } from 'test/factories/make-checkIn-files';

let inMemoryCheckInRepository: InMemoryCheckInRepository;
let inMemoryCheckInFilesRepository: InMemoryCheckInFilesRepository;
let sut: EditCheckInUseCase;

describe('edit CheckIn', () => {
  beforeEach(() => {
    inMemoryCheckInFilesRepository = new InMemoryCheckInFilesRepository();
    inMemoryCheckInRepository = new InMemoryCheckInRepository(inMemoryCheckInFilesRepository);
    sut = new EditCheckInUseCase(
      inMemoryCheckInRepository,
      inMemoryCheckInFilesRepository,
    );
  });
  it('should be able to edit a checkIn', async () => {
    const checkIn = MakeCheckIn();

    inMemoryCheckInRepository.items.push(checkIn);

    inMemoryCheckInFilesRepository.items.push(
      MakeCheckInFile({
        checkInId: checkIn.id,
        fileId: new UniqueEntityID('1'),
      }),
      MakeCheckInFile({
        checkInId: checkIn.id,
        fileId: new UniqueEntityID('2'),
      }),
    );

    const result = await sut.execute({
      id: checkIn.id.toString(),
      clientId: checkIn.clientId,
      fileId: ['1', '3'],
      typeVehicle: checkIn.typeVehicle,
      vehicleId: 'rkl-9e96',
    });
    const checkInResult = inMemoryCheckInRepository.items[0];

    expect(checkInResult).toBeTruthy();
    expect(checkInResult.file.currentItems).toEqual([
      expect.objectContaining({ fileId: new UniqueEntityID('1') }),
      expect.objectContaining({ fileId: new UniqueEntityID('3') }),
    ]);
  });
});
