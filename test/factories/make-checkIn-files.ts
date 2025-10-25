import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
    CheckInFiles,
    CheckInFilesProps,
} from '@/domain/enterprise/entities/checkIn-file';

export function MakeCheckInFile(
  override: Partial<CheckInFilesProps> = {},
  id?: UniqueEntityID,
) {
  const checkInFile = CheckInFiles.create(
    {
      fileId: new UniqueEntityID(),
      checkInId: new UniqueEntityID(),
      ...override,
    },
    id,
  );
  return checkInFile;
}
