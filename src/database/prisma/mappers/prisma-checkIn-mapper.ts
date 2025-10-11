import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CheckIn } from '@/domain/enterprise/entities/check-in';
import { CheckIn as PrismaCheckIn } from '@prisma/client';

export class PrismaCheckInMapper {
  static toDomain(raw: PrismaCheckIn): CheckIn {
    return CheckIn.create(
      {
        clientId: new UniqueEntityID(raw.clientId),
        vehicleId: raw.vehicleId,
        checkInAt: raw.createdAt,
        checkOutAt: raw.checkOut ?? null,
        typeVehicle:'',
        vehiclePhoto:'',
      },
      new UniqueEntityID(raw.id),
    );
  }
}
