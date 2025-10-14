import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { PaginationParams } from '@/core/repositories/pagination-params';
import type { CheckInRepository } from '@/domain/aplication/repositories/check-in-repository';
import type { CheckIn } from '@/domain/enterprise/entities/check-in';

export class InMemoryCheckInRepository implements CheckInRepository {
  public items: CheckIn[] = [];
  async findByVehicleId(vehicleId: string) {
    const checkIn = this.items.find((item) => item.vehicleId === vehicleId);
    if (!checkIn) {
      return null;
    }
    return checkIn;
  }
  async findByAll() {
    const allCheckIns = this.items;
    return allCheckIns;
  }
  async findById(clientId: UniqueEntityID) {
    const clientCheckIn = this.items.find((item) => item.clientId === clientId);
    if (!clientCheckIn) {
      return null;
    }
    return clientCheckIn;
  }
  // async findById(clientId: UniqueEntityID, { page }: PaginationParams) {
  //   const clientCheckIn = this.items
  //     .filter((item) => item.clientId === clientId)
  //     .slice((page - 1) * 20, page * 20);
  //   if (!clientCheckIn) {
  //     return null;
  //   }
  //   return clientCheckIn;
  // }
  async delete(checkIn: CheckIn) {
    const itemIndex = this.items.findIndex(
      (item) => item.clientId === checkIn.clientId,
    );
    this.items.splice(itemIndex, 1);
    return null;
  }
  async create(checkIn: CheckIn) {
    this.items.push(checkIn);
    return checkIn;
  }
}
