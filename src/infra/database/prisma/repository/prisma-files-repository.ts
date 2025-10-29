import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FileRepository } from '@/domain/aplication/repositories/file-repository';
import { Files } from '@/domain/enterprise/entities/files';
import { PrismaFilesMapper } from '../mappers/prisma-files-mapper';

@Injectable()
export class PrismaFileRepository implements FileRepository {
  constructor(private prisma: PrismaService) {}
  async create(file: Files): Promise<void> {
    const data = PrismaFilesMapper.toPrisma(file);
    await this.prisma.files.create({
      data,
    });
  }
}
