import { CheckInRepository } from '@/domain/aplication/repositories/check-in-repository';
import { CheckIn } from '@/domain/enterprise/entities/check-in';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaCheckInRepository implements CheckInRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(vehicleId: string): Promise<CheckIn | null> {
    const user = await this.prisma.checkIn.findFirst({
      where: {
        vehicleId,
      },
    });

    return null;
  }
  create(checkIn: CheckIn): Promise<CheckIn> {
    throw new Error('Method not implemented.');
  }
  delete(CheckIn: CheckIn): Promise<null> {
    throw new Error('Method not implemented.');
  }
}
