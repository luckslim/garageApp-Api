import { InMemoryCheckInRepository } from '../../../../test/repositories/in-memory-check-in-repository';
import { CheckInClientUseCase } from './check-in';
import { MakeCheckIn } from '../../../../test/factories/make-checkIn';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryCheckInRepository: InMemoryCheckInRepository;
let sut: CheckInClientUseCase;

describe('register CheckIn', () => {
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository();
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
    expect(checkIn.file).toEqual([
      expect.objectContaining({ fileId: new UniqueEntityID('1') }),
      expect.objectContaining({ fileId: new UniqueEntityID('2') }),
    ]);
  });
});
