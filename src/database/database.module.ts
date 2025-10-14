import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ClientRepository } from '@/domain/aplication/repositories/client-repository';
import { CheckInRepository } from '@/domain/aplication/repositories/check-in-repository';
import { PrismaClientRepository } from './prisma/repository/prisma-client-repository';
import { PrismaCheckInRepository } from './prisma/repository/prisma-checkIn-repository';

@Module({
  providers: [
    PrismaService,
    { provide: ClientRepository, useClass: PrismaClientRepository },
    { provide: CheckInRepository, useClass: PrismaCheckInRepository },
  ],
  exports: [PrismaService, ClientRepository, CheckInRepository],
})
export class DatabaseModule {}
