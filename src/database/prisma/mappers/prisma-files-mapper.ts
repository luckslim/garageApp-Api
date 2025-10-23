import { Files } from '@/domain/enterprise/entities/files';
import { Prisma } from '@prisma/client';
export class PrismaFilesMapper {
  static toPrisma(file: Files): Prisma.FilesUncheckedCreateInput {
    return {
        id: file.id.toString(),
        title: file.fileName,
        url: file.url,
    };
  }
}
