import type { Client } from "@/domain/enterprise/entities/client";

export interface ClientRepository {
  findByEmail(email: string): Promise<Client | null>;
  create(client: Client): Promise<Client>;
  deleteByEmail(email: string): Promise<null>;
  save(client: Client): Promise<Client>
}
