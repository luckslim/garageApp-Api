import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CheckIn } from '@/domain/enterprise/entities/check-in';
import { CheckIn as PrismaCheckIn, typeVehicle} from '@prisma/client';

export class PrismaCheckInMapper {
  static toDomain(raw: PrismaCheckIn): CheckIn {
    return CheckIn.create(
      {
        clientId: raw.clientId,
        vehicleId: raw.vehicleId,
        checkInAt: raw.createdAt,
        checkOutAt: raw.checkOut ?? undefined,
        typeVehicle: raw.typeVehicle ?? undefined,
        vehiclePhoto: raw.photoVehicle as string 
      },
      new UniqueEntityID(raw.id),
    );
  }
  static toPrisma(checkIn: CheckIn): PrismaCheckIn {
    return {
      id: checkIn.id.toString(),
      clientId: checkIn.clientId.toString(),
      vehicleId: checkIn.vehicleId,
      typeVehicle: checkIn.typeVehicle as typeVehicle,
      photoVehicle: checkIn.vehiclePhoto ?? null,
      checkOut: checkIn.checkOutAt ?? null,
      createdAt: checkIn.checkInAt ?? new Date(),
    };
  }
}
