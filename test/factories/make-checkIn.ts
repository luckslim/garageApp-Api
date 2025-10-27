import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  CheckIn,
  type CheckInProps,
} from '@/domain/enterprise/entities/check-in';
import { faker } from '../../node_modules/@faker-js/faker/dist/index';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaCheckInMapper } from '@/infra/database/prisma/mappers/prisma-checkIn-mapper';

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
@Injectable()
export class CheckInFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaCheckIn(data: Partial<CheckInProps>): Promise<CheckIn> {
    const checkIn = MakeCheckIn(data);
    await this.prisma.checkIn.create({
      data: PrismaCheckInMapper.toPrisma(checkIn),
    });
    return checkIn
  }
}
