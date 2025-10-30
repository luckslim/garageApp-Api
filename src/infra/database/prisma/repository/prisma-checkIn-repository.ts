import { CheckInRepository } from '@/domain/aplication/repositories/check-in-repository';
import { CheckIn } from '@/domain/enterprise/entities/check-in';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaCheckInMapper } from '../mappers/prisma-checkIn-mapper';
import { CheckInFilesRepository } from '@/domain/aplication/repositories/check-in-files-repository';
import { PaginationParams } from '@/core/repositories/pagination-params';

@Injectable()
export class PrismaCheckInRepository implements CheckInRepository {
  constructor(
    private prisma: PrismaService,
    private checkInfileRepository: CheckInFilesRepository,
  ) {}

  async findById(id: string, { page }: PaginationParams): Promise<CheckIn[]> {
    const perPage = 1
    const checkIn = await this.prisma.checkIn.findMany({
      where: {
        clientId: id,
      },
      orderBy: {
        createdAt: 'asc',
      },
      skip: (page-1) * perPage,
      take: perPage,
    });
    return checkIn.map(PrismaCheckInMapper.toDomain);
  }
  async findByClientId(clientId: string): Promise<CheckIn | null> {
    const checkin = await this.prisma.checkIn.findFirst({
      where: {
        clientId,
      },
    });
    if (!checkin) {
      return null;
    }
    return PrismaCheckInMapper.toDomain(checkin);
  }
  async findByCheckInId(checkInId: string): Promise<CheckIn | null> {
    const checkIn = await this.prisma.checkIn.findFirst({
      where: {
        id: checkInId,
      },
    });
    if (!checkIn) {
      return null;
    }
    return PrismaCheckInMapper.toDomain(checkIn);
  }
  async create(checkIn: CheckIn): Promise<CheckIn> {
    const data = PrismaCheckInMapper.toPrisma(checkIn);
    const user = await this.prisma.checkIn.create({
      data,
    });
    await this.checkInfileRepository.createMany(checkIn.file.getItems());
    return PrismaCheckInMapper.toDomain(user);
  }
  async save(checkIn: CheckIn): Promise<void> {
    const data = PrismaCheckInMapper.toPrisma(checkIn);
    const { id, clientId, ...update } = data;
    const result = await Promise.all([
      this.prisma.checkIn.update({
        where: {
          id,
        },
        data: update,
      }),
      this.checkInfileRepository.deleteMany(checkIn.file.getRemovedItems()),
      this.checkInfileRepository.createMany(checkIn.file.getNewItems()),
    ]);
  }
  async delete(checkInId: string): Promise<null> {
    await this.prisma.checkIn.delete({
      where: {
        id: checkInId,
      },
    });
    return null;
  }
  findByAll(): Promise<CheckIn[]> {
    throw new Error('Method not implemented.');
  }
  findByVehicleId(vehicleId: string): Promise<CheckIn | null> {
    throw new Error('Method not implemented.');
  }
}
