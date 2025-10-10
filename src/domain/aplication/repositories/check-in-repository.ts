import type { CheckIn } from "@/domain/enterprise/entities/check-in";

export interface CheckInRepository {
  findById(vehicleId: string):Promise<CheckIn | null>
  create(checkIn: CheckIn): Promise<CheckIn>;
  delete(CheckIn: CheckIn): Promise<null>;

}
