import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
    CheckInFiles,
    CheckInFilesProps,
} from '@/domain/enterprise/entities/checkIn-file';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

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
@Injectable()
export class CheckInFilesFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaCheckInFiles(data: Partial<CheckInFilesProps>): Promise<CheckInFiles> {
    const checkInFiles = MakeCheckInFile(data);
    await this.prisma.files.update({
      where:{
        id: checkInFiles.fileId.toString()
      },
      data: {
        checkInId: checkInFiles.checkInId.toString()
      }
    })
    return checkInFiles
  }
}