import type { Client } from '@/domain/enterprise/entities/client';
export abstract class ClientRepository {
  abstract findByEmail(email: string): Promise<Client | null>;
  abstract create(client: Client): Promise<Client>;
  abstract deleteByEmail(email: string): Promise<null>;
  abstract save(client: Client): Promise<Client>;
}
