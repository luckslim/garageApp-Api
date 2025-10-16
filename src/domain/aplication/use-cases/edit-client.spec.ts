import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeClient } from "../../../../test/factories/make-client";
import { InMemoryClientRepository } from "../../../../test/repositories/in-memory-clients-repository";
import { EditClientUseCase } from "./edit-client";
import { NotAllowedError } from "./errors/Not-allowed-error";

let inMemoryClientRepository: InMemoryClientRepository;
let sut: EditClientUseCase;

describe("edit client", () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository();
    sut = new EditClientUseCase(inMemoryClientRepository);
  });
  it("should be able to edit a client", async () => {
    const client =  makeClient({
      email: "lucaslima78@hotmail.com",
      name: "lucas",
    });

    inMemoryClientRepository.items.push(client);

    await sut.execute({
      id: client.id.toString(),
      email: "lucaslima78@hotmail.com",
      name: "teste",
      password: "teste-123",
    });

    const savedClient = inMemoryClientRepository.items[0];
    expect(savedClient).toMatchObject({
      name:"teste"
    })
  });
  it("should not be able to delete another user", async () => {
    const client = makeClient({
      email: "lucaslima78@hotmail.com",
    });
    inMemoryClientRepository.items.push(client);
    const result = await sut.execute({
      id: new UniqueEntityID('lucas-Id').toString(),
      email: "another-user@hotmail.com",
      name: "another",
      password: "another-123",
    });
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError)
  });
});
