import { CheckInFilesRepository } from '@/domain/aplication/repositories/check-in-files-repository';
import { CheckInFiles } from '@/domain/enterprise/entities/checkIn-file';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PrismaCheckInFilesRespository implements CheckInFilesRepository {
  constructor(private prisma: PrismaService) {}
  async createMany(files: CheckInFiles[]): Promise<void> {
    if (files.length === 0) {
      return;
    }
    const fileIds = files.map((file) => {
      return file.fileId.toString();
    });
    await this.prisma.files.updateMany({
      where: {
        id: {
          in: fileIds,
        },
      },
      data: {
        checkInId: files[0].checkInId.toString(),
      },
    });
  }
  async deleteMany(files: CheckInFiles[]): Promise<void> {
    if (files.length === 0) {
      return;
    }
    const fileIds = files.map((file) => {
      return file.id.toString();
    });
    await this.prisma.files.deleteMany({
        where:{
            id: {
                in: fileIds
            }
        }
    })
  }
  findManyCheckInId(CheckInId: string): Promise<CheckInFiles[]> {
    throw new Error('Method not implemented.');
  }
  deleteManyByCheckInId(CheckInId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
