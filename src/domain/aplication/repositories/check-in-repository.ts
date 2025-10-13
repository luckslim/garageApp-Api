import type { CheckIn } from '@/domain/enterprise/entities/check-in';

export abstract class CheckInRepository {
  abstract findById(vehicleId: string): Promise<CheckIn | null>;
  abstract findByAll():Promise<CheckIn[]>
  abstract create(checkIn: CheckIn): Promise<CheckIn>;
  abstract delete(CheckIn: CheckIn): Promise<null>;
}
