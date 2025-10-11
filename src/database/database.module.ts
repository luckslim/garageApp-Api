import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaClientRepository } from './prisma/prisma-client-repository';
import { PrismaCheckInRepository } from './prisma/prisma-checkIn-repository';
import { ClientRepository } from '@/domain/aplication/repositories/client-repository';

@Module({
  providers: [
    PrismaService,
    { provide: ClientRepository, useClass: PrismaClientRepository },
    PrismaCheckInRepository,
  ],
  exports: [PrismaService, ClientRepository, PrismaCheckInRepository],
})
export class DatabaseModule {}
