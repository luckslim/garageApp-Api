import type { CheckInRepository } from "@/domain/aplication/repositories/check-in-repository";
import type { CheckIn } from "@/domain/enterprise/entities/check-in";

export class InMemoryCheckInRepository implements CheckInRepository {
  public items: CheckIn[] = [];
  async findByAll(): Promise<CheckIn[]> {
    const allCheckIns = this.items
    return allCheckIns
  }
  async findById(vehicleId: string) {
    const clientCheckIn = this.items.find(
      (item) => item.vehicleId === vehicleId
    );
    return clientCheckIn ?? null
  }
  async delete(checkIn: CheckIn) {
    const itemIndex = this.items.findIndex(
      (item) => item.clientId === checkIn.clientId
    );
    this.items.splice(itemIndex, 1);
    return null;
  }
  async create(checkIn: CheckIn) {
    this.items.push(checkIn);
    return checkIn;
  }
}
