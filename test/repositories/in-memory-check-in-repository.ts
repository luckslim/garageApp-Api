import { CheckInFilesRepository } from '@/domain/aplication/repositories/check-in-files-repository';
import type { CheckInRepository } from '@/domain/aplication/repositories/check-in-repository';
import type { CheckIn } from '@/domain/enterprise/entities/check-in';

export class InMemoryCheckInRepository implements CheckInRepository {
  public items: CheckIn[] = [];
  constructor(private checkInFilesRepository: CheckInFilesRepository) {}
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
  async findByClientId(clientId: string) {
    const clientCheckIn = this.items.find((item) => item.clientId === clientId);
    if (!clientCheckIn) {
      return null;
    }
    return clientCheckIn;
  }
  async findByCheckInId(checkInId: string): Promise<CheckIn | null> {
    const checkInIdFind = this.items.find(
      (item) => item.id.toString() === checkInId,
    );
    if (!checkInIdFind) {
      return null;
    }
    return checkInIdFind;
  }
  async delete(Id: string) {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === Id);
    this.items.splice(itemIndex, 1);
    this.checkInFilesRepository.deleteManyByCheckInId(Id)
    return null;
  }
  async create(checkIn: CheckIn) {
    this.items.push(checkIn);
    return checkIn;
  }
  async save(checkIn: CheckIn): Promise<CheckIn> {
    const itemIndex = this.items.findIndex((item) => item.id === checkIn.id);
    this.items[itemIndex] = checkIn;
    return checkIn;
  }
}
