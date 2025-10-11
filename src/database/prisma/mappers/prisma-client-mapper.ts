import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Client } from '@/domain/enterprise/entities/client';
import { User as PrismaClient } from '@prisma/client';
export class PrismaClientMapper {
  static toDomain(raw: PrismaClient): Client {
    return Client.create(
      {
        clientId: new UniqueEntityID(raw.id),
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    );
  }
  static toPrisma(client: Client): PrismaClient {
    return {
      id: client.id.toString(),
      name: client.name,
      email: client.email,
      password: client.password,
    };
  }
}
