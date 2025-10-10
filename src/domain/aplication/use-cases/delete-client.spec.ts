import { InMemoryClientRepository } from "../../../../test/repositories/in-memory-clients-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DeleteClientUseCase } from "./delete-client";
import { makeClient } from "../../../../test/factories/make-client";
import { NotAllowedError } from "./errors/Not-allowed-error";

let inMemoryClientRepository: InMemoryClientRepository;
let sut: DeleteClientUseCase;

describe("delete client", () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository();
    sut = new DeleteClientUseCase(inMemoryClientRepository);
  });
  it("should be able to delete a client", async () => {
    const client = makeClient({
      clientId: new UniqueEntityID("lucas-123"),
      email: "lucaslima78@hotmail.com",
    });
    inMemoryClientRepository.items.push(client);
    await sut.execute({
      clientId: "lucas-123",
      email: "lucaslima78@hotmail.com",
    });
    expect(inMemoryClientRepository.items).toHaveLength(0);
  });
  it("should not be able delete another user", async() => {
    const client = makeClient({
      clientId: new UniqueEntityID("lucas-123"),
      email: "lucaslima78@hotmail.com",
    });
    inMemoryClientRepository.items.push(client);
    const result = await sut.execute({
      clientId: "another-user",
      email: "another-user@hotmail.com",
    });
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  });
});
