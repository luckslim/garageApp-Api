import { InMemoryCheckInRepository } from '../../../../test/repositories/in-memory-check-in-repository';
import { MakeCheckIn } from '../../../../test/factories/make-checkIn';
import { InMemoryClientRepository } from '../../../../test/repositories/in-memory-clients-repository';
import { makeClient } from 'test/factories/make-client';
import { fetchByVehicleIdUseCase } from './fetch-checkIn-by-vehicleId';

let inMemoryCheckInRepository: InMemoryCheckInRepository;
let inMemoryClientRepository: InMemoryClientRepository;
let sut: fetchByVehicleIdUseCase;

describe('Fetch checkIn by User', () => {
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository();
    inMemoryClientRepository = new InMemoryClientRepository();
    sut = new fetchByVehicleIdUseCase(
      inMemoryCheckInRepository,
      inMemoryClientRepository,
    );
  });
  it('should be able to fetch a checkIn by user', async () => {
    const user = makeClient({
      email: 'lucaslima78@hotmail.com',
    });

    if (!user.clientId) {
      return null;
    }

    const checkIn = MakeCheckIn({
      clientId: user.clientId,
    });
    inMemoryClientRepository.items.push(user);
    inMemoryCheckInRepository.items.push(checkIn);
    const result = await sut.execute({
      VehicleId: checkIn.vehicleId,
      clientId: user.clientId,
    });
    expect(inMemoryCheckInRepository.items[0]).toBeTruthy();
    expect(result.isRight()).toBe(true);
  });
});
