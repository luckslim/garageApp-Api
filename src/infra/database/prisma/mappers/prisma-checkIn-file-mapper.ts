import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CheckInFiles } from '@/domain/enterprise/entities/checkIn-file';
import { Prisma, Files as PrismaFile } from '@prisma/client';
export class PrismaCheckInFileMapper {
  static toDomain(raw: PrismaFile): CheckInFiles {
    if (!raw.checkInId) {
      throw new Error('invalid file type');
    }
    return CheckInFiles.create(
      {
        fileId: new UniqueEntityID(raw.id),
        checkInId: new UniqueEntityID(raw.checkInId),
      },
      new UniqueEntityID(),
    );
  }
  static toPrisma(files: CheckInFiles[]): Prisma.FilesUpdateManyArgs {
    const fileIds = files.map((file) => {
      return file.fileId.toString();
    });
    return {
      where: {
        id: {
          in: fileIds,
        },
      },
      data: {
        checkInId: files[0].checkInId.toString(),
      },
    };
  }
}
