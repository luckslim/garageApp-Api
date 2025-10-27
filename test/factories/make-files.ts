import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Client } from '@/domain/enterprise/entities/client';
import { faker } from '../../node_modules/@faker-js/faker/dist/index';
import { Files, FilesProps } from '@/domain/enterprise/entities/files';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaFilesMapper } from '@/infra/database/prisma/mappers/prisma-files-mapper';

export function makeFiles(
  override: Partial<FilesProps> = {},
  id?: UniqueEntityID,
) {
  const file = Files.create(
    {
      fileName: faker.lorem.slug(),
      url: faker.lorem.slug(),
      ...override,
    },
    id,
  );
  return file;
}
@Injectable()
export class FilesFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaFiles(data: Partial<FilesProps>): Promise<Files> {
    const file = makeFiles(data);
    await this.prisma.files.create({
      data: PrismaFilesMapper.toPrisma(file),
    });
    return file;
  }
}
