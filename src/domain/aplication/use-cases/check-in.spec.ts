import { InMemoryCheckInRepository } from '../../../../test/repositories/in-memory-check-in-repository';
import { CheckInClientUseCase } from './check-in';
import { MakeCheckIn } from '../../../../test/factories/make-checkIn';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryCheckInFilesRepository } from 'test/repositories/in-memory-check-in-files-repository';

let inMemoryCheckInRepository: InMemoryCheckInRepository;
let inMemoryCheckInFilesRepository: InMemoryCheckInFilesRepository;
let sut: CheckInClientUseCase;

describe('register CheckIn', () => {
  beforeEach(() => {
    inMemoryCheckInFilesRepository = new InMemoryCheckInFilesRepository();
    inMemoryCheckInRepository = new InMemoryCheckInRepository(
      inMemoryCheckInFilesRepository,
    );

    sut = new CheckInClientUseCase(inMemoryCheckInRepository);
  });
  it('should be able to register a new checkIn', async () => {
    const checkInId = MakeCheckIn();
    await sut.execute({
      clientId: checkInId.clientId,
      typeVehicle: checkInId.typeVehicle ?? 'vehicle',
      vehicleId: checkInId.vehicleId,
      vehiclePhoto: checkInId.vehiclePhoto,
      fileIds: ['1', '2'],
    });

    const checkIn = inMemoryCheckInRepository.items[0];
    expect(checkIn).toBeTruthy();
    expect(checkIn.file.currentItems).toEqual([
      expect.objectContaining({ fileId: new UniqueEntityID('1') }),
      expect.objectContaining({ fileId: new UniqueEntityID('2') }),
    ]);
  });
    it('should persist files when creating a new checkIn', async () => {
    const checkInId = MakeCheckIn();
    await sut.execute({
      clientId: checkInId.clientId,
      typeVehicle: checkInId.typeVehicle ?? 'vehicle',
      vehicleId: checkInId.vehicleId,
      vehiclePhoto: checkInId.vehiclePhoto,
      fileIds: ['1', '2'],
    });

    const checkIn = inMemoryCheckInRepository.items[0];
    expect(checkIn).toBeTruthy();
    expect(inMemoryCheckInFilesRepository.items).toHaveLength(2)
  });
});
