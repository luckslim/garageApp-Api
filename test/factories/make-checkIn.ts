import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  CheckIn,
  type CheckInProps,
} from '@/domain/enterprise/entities/check-in';
import { faker } from '../../node_modules/@faker-js/faker/dist/index';

export function MakeCheckIn(
  override: Partial<CheckInProps> = {},
  id?: UniqueEntityID,
) {
  const checkInId = CheckIn.create(
    {
      clientId: faker.string.uuid(),
      typeVehicle: faker.lorem.word(),
      vehicleId: faker.lorem.word(),
      vehiclePhoto: faker.lorem.word(),
      checkInAt: faker.date.anytime(),
      ...override,
    },
    id,
  );
  return checkInId;
}
