import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { PaginationParams } from '@/core/repositories/pagination-params';
import type { CheckIn } from '@/domain/enterprise/entities/check-in';

export abstract class CheckInRepository {
  abstract findById(
    clientId: UniqueEntityID
  ): Promise<CheckIn | null>;
  abstract findByVehicleId(vehicleId: string): Promise<CheckIn | null>;
  abstract findByAll(): Promise<CheckIn[]>;
  abstract create(checkIn: CheckIn): Promise<CheckIn>;
  abstract delete(CheckIn: CheckIn): Promise<null>;
}
