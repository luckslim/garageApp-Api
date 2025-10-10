import type { ClientRepository } from "@/domain/aplication/repositories/client-repository";
import type { Client } from "@/domain/enterprise/entities/client";

export class InMemoryClientRepository implements ClientRepository {
  public items: Client[] = [];
  async save(client: Client) {
    const itemIndex = this.items.findIndex(
      (item) => item.email === client.email
    );
    this.items[itemIndex] = client;
    return client;
  }
  async deleteByEmail(email: string) {
    const indexItem = this.items.findIndex((item) => item.email !== email);
    this.items.splice(indexItem, 1);
    return null;
  }
  async findByEmail(email: string) {
    const client = this.items.find((item) => item.email === email);
    if (!client) {
      return null;
    }
    return client;
  }
  async create(client: Client) {
    this.items.push(client);
    return client;
  }
}
