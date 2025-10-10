import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Client, type ClientProps } from "@/domain/enterprise/entities/client";
import { faker } from "../../node_modules/@faker-js/faker/dist/index";

export function makeClient(
  override: Partial<ClientProps> = {},
  id?: UniqueEntityID
) {
  const client = Client.create(
    {
      clientId: new UniqueEntityID(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id
  );
  return client
}
