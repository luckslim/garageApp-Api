import { ClientRepository } from '@/domain/aplication/repositories/client-repository';
import { Client } from '@/domain/enterprise/entities/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaClientMapper } from '../mappers/prisma-client-mapper';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

@Injectable()
export class PrismaClientRepository implements ClientRepository {
  constructor(private prisma: PrismaService) {}

  async findById(clientId: UniqueEntityID): Promise<Client | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: clientId.toString(),
      },
    });
    if (!user) {
      return null;
    }
    return PrismaClientMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<Client | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return null;
    }
    return PrismaClientMapper.toDomain(user);
  }

  async create(client: Client): Promise<Client> {
    const data = PrismaClientMapper.toPrisma(client);
    const user = await this.prisma.user.create({
      data,
    });
    return PrismaClientMapper.toDomain(user);
  }

  async deleteByEmail(email: string): Promise<null> {
    await this.prisma.user.delete({
      where: {
        email,
      },
    });
    return null;
  }

  async save(client: Client): Promise<Client> {
    const data = PrismaClientMapper.toPrisma(client);
    const user = await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });
    return PrismaClientMapper.toDomain(user);
  }
}
