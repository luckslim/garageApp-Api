import { CheckInFilesRepository } from '@/domain/aplication/repositories/check-in-files-repository';
import { CheckInFiles } from '@/domain/enterprise/entities/checkIn-file';

export class InMemoryCheckInFilesRepository implements CheckInFilesRepository {
  public items: CheckInFiles[] = [];
  async findManyCheckInId(CheckInId: string): Promise<CheckInFiles[]> {
    const checkInFiles = this.items.filter(
      (item) => item.checkInId.toString() === CheckInId,
    );
    return checkInFiles;
  }
   async deleteManyByCheckInId(CheckInId: string): Promise<void> {
    const checkInFiles = this.items.filter(
      (item) => item.checkInId.toString() !== CheckInId,
    );
    this.items = checkInFiles
  }
}
