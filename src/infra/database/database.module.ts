import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ClientRepository } from '@/domain/aplication/repositories/client-repository';
import { CheckInRepository } from '@/domain/aplication/repositories/check-in-repository';
import { PrismaClientRepository } from './prisma/repository/prisma-client-repository';
import { PrismaCheckInRepository } from './prisma/repository/prisma-checkIn-repository';
import { FileRepository } from '@/domain/aplication/repositories/file-repository';
import { PrismaFileRepository } from './prisma/repository/prisma-files-repository';
import { CheckInFilesRepository } from '@/domain/aplication/repositories/check-in-files-repository';
import { PrismaCheckInFilesRespository } from './prisma/repository/prisma-checkIn-files-repository';

@Module({
  providers: [
    PrismaService,
    { provide: ClientRepository, useClass: PrismaClientRepository },
    { provide: CheckInRepository, useClass: PrismaCheckInRepository },
    {
      provide: CheckInFilesRepository,
      useClass: PrismaCheckInFilesRespository,
    },
    { provide: FileRepository, useClass: PrismaFileRepository },
  ],
  exports: [
    PrismaService,
    ClientRepository,
    CheckInRepository,
    FileRepository,
    CheckInFilesRepository,
  ],
})
export class DatabaseModule {}
