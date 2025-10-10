import { InMemoryClientRepository } from "../../../../test/repositories/in-memory-clients-repository";
import { RegisterClientUseCase } from "./register-client";

let inMemoryClientRepository: InMemoryClientRepository;
let sut: RegisterClientUseCase;

describe("register Client", () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository();
    sut = new RegisterClientUseCase(inMemoryClientRepository);
  });
  it("should be able to register a new client", async () => {
    await sut.execute({
      name: "lucas soares lima",
      email: "lucaslima78@hotmail.com",
      password: "123",
    });
    const client = inMemoryClientRepository.items[0];
    expect(client).toBeTruthy();
    expect(client?.name).toBe("lucas soares lima");
  });
});
