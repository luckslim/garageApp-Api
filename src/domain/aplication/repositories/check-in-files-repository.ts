import { CheckInFiles } from '@/domain/enterprise/entities/checkIn-file';

export abstract class CheckInFilesRepository {
  abstract createMany(files: CheckInFiles[]): Promise<void>;
  abstract deleteMany(files: CheckInFiles[]): Promise<void>;

  abstract findManyCheckInId(CheckInId: string): Promise<CheckInFiles[]>;
  abstract deleteManyByCheckInId(CheckInId: string): Promise<void>;
}
