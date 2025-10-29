import { CheckInFilesRepository } from '@/domain/aplication/repositories/check-in-files-repository';
import { CheckInFiles } from '@/domain/enterprise/entities/checkIn-file';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaCheckInFileMapper } from '../mappers/prisma-checkIn-file-mapper';
import { randomUUID } from 'node:crypto';
@Injectable()
export class PrismaCheckInFilesRespository implements CheckInFilesRepository {
  constructor(private prisma: PrismaService) {}
  async createMany(files: CheckInFiles[]): Promise<void> {
    if (files.length === 0) return;

    await Promise.all(
      files.map(async (file) => {
        const fileId = file.fileId.toString();
        const checkInId = file.checkInId.toString();

        const exists = await this.prisma.files.findUnique({
          where: { id: fileId },
        });

        if (exists) {
          // Atualiza vínculo
          await this.prisma.files.update({
            where: { id: fileId },
            data: { checkInId, },
          });
        } else {
          // Cria novo registro
          await this.prisma.files.create({
            data: {
              id: fileId,
              title: randomUUID(),
              url: randomUUID(),
              checkInId,
            },
          });
        }
      }),
    );
  }

  async deleteMany(files: CheckInFiles[]): Promise<void> {
    if (files.length === 0) {
      return;
    }
    const fileIds = files.map((file) => {
      return file.fileId.toString();
    });
    await this.prisma.files.deleteMany({
      where: {
        id: {
          in: fileIds,
        },
      },
    });
  }
  async findManyCheckInId(CheckInId: string): Promise<CheckInFiles[]> {
    const checkInFiles = await this.prisma.files.findMany({
      where: {
        checkInId: CheckInId,
      },
    });
    return checkInFiles.map(PrismaCheckInFileMapper.toDomain);
  }
  deleteManyByCheckInId(CheckInId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
