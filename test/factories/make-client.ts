import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Client, type ClientProps } from '@/domain/enterprise/entities/client';
import { faker } from '../../node_modules/@faker-js/faker/dist/index';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaClientMapper } from '@/infra/database/prisma/mappers/prisma-client-mapper';

export function makeClient(
  override: Partial<ClientProps> = {},
  id?: UniqueEntityID,
) {
  const client = Client.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  );
  return client;
}
@Injectable()
export class ClientFactory {
  constructor(private prisma: PrismaService) {}
  async makePrismaCheckIn(data: Partial<ClientProps>): Promise<Client> {
    const user = makeClient(data);

    await this.prisma.user.create({
      data: PrismaClientMapper.toPrisma(user),
    });
    return user;
  }
}
