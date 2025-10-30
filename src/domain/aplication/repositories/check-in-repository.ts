import { PaginationParams } from '@/core/repositories/pagination-params';
import type { CheckIn } from '@/domain/enterprise/entities/check-in';

export abstract class CheckInRepository {
  abstract findByClientId(clientId: string): Promise<CheckIn | null>;
  abstract findByCheckInId(checkInId: string): Promise<CheckIn | null>;
  abstract findByVehicleId(vehicleId: string): Promise<CheckIn | null>;
  abstract findById(id:string, page: PaginationParams):Promise<CheckIn[]>
  abstract findByAll(): Promise<CheckIn[]>;
  abstract create(checkIn: CheckIn): Promise<CheckIn>;
  abstract save(checkIn: CheckIn): Promise<void>;
  abstract delete(Id: string): Promise<null>;
}
