import { InMemoryClientRepository } from "../../../../test/repositories/in-memory-clients-repository";
import { DeleteClientUseCase } from "./delete-client";
import { makeClient } from "../../../../test/factories/make-client";
import { NotAllowedError } from "./errors/Not-allowed-error";
import { unicodeEmail } from "zod/v4/core/regexes.cjs";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryClientRepository: InMemoryClientRepository;
let sut: DeleteClientUseCase;

describe("delete client", () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository();
    sut = new DeleteClientUseCase(inMemoryClientRepository);
  });
  it("should be able to delete a client", async () => {
    const client = makeClient({
      email: "lucaslima78@hotmail.com",
    });
    inMemoryClientRepository.items.push(client);
    await sut.execute({
      id: client.id.toString()
    });
    
    expect(inMemoryClientRepository.items).toHaveLength(0);
  });
  it("should not be able delete another user", async() => {
    const client = makeClient({
      email: "lucaslima78@hotmail.com",
    });
    inMemoryClientRepository.items.push(client);
    const result = await sut.execute({
      id: new UniqueEntityID('test-123').toString()
    });
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  });
});
