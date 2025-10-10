import {InMemoryEmployRepository } from "../../../../test/repositories/in-memory-employ-repository";
import { RegisterEmployUseCase } from "./register-employ";

let inMemoryEmployRepository: InMemoryEmployRepository;
let sut: RegisterEmployUseCase;

describe("register Employ", () => {
  beforeEach(() => {
    inMemoryEmployRepository = new InMemoryEmployRepository();
    sut = new RegisterEmployUseCase(inMemoryEmployRepository);
  });
  it("should be able to register a new employ", async () => {
    await sut.execute({
      name: "lucas soares lima",
      email: "lucaslima78@hotmail.com",
      password: "123",
    });
    const employ = inMemoryEmployRepository.items[0];
    expect(employ).toBeTruthy();
    expect(employ?.name).toBe("lucas soares lima");
  });
});
