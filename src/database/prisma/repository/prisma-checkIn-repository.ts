import { CheckInRepository } from '@/domain/aplication/repositories/check-in-repository';
import { CheckIn } from '@/domain/enterprise/entities/check-in';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaCheckInMapper } from '../mappers/prisma-checkIn-mapper';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

@Injectable()
export class PrismaCheckInRepository implements CheckInRepository {
  constructor(private prisma: PrismaService) {}
  findByVehicleId(vehicleId: string): Promise<CheckIn | null> {
    throw new Error('Method not implemented.');
  }
  findByAll(): Promise<CheckIn[]> {
    throw new Error('Method not implemented.');
  }
  async findById(clientId: UniqueEntityID): Promise<CheckIn | null> {
    const user = await this.prisma.checkIn.findFirst({
      where: {
        clientId: clientId.toString(),
      },
    });
    if (!user) {
      return null;
    }
    return PrismaCheckInMapper.toDomain(user);
  }
  async create(checkIn: CheckIn): Promise<CheckIn> {
    const data = PrismaCheckInMapper.toPrisma(checkIn);
    const user = await this.prisma.checkIn.create({
      data,
    });
    return PrismaCheckInMapper.toDomain(user);
  }
  async delete(checkIn: CheckIn): Promise<null> {
    const data = PrismaCheckInMapper.toPrisma(checkIn);
    await this.prisma.checkIn.delete({
      where: {
        id: data.id,
      },
    });
    return null;
  }
}
