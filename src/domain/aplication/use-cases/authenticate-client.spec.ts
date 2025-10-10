import { FakeEncrypter } from "../../../../test/cryptography/fake-encrypter";
import { FakeHasher } from "../../../../test/cryptography/fake-hasher";
import { makeClient } from "../../../../test/factories/make-client";
import { InMemoryClientRepository } from "../../../../test/repositories/in-memory-clients-repository";
import { AuthenticateClientUseCase } from "./authenticate-client";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
let inMemoryClientRepository: InMemoryClientRepository;
let fakeHasher: FakeHasher;
let encrypter: FakeEncrypter;

let sut: AuthenticateClientUseCase;
describe("authenticate Client", () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository();
    fakeHasher = new FakeHasher();
    encrypter = new FakeEncrypter();
    sut = new AuthenticateClientUseCase(
      inMemoryClientRepository,
      fakeHasher,
      encrypter
    );
  });
  it("should be able to authenticate a client", async () => {
    const client = makeClient({
      email: "lucaslima78@hotmail.com",
      password: await fakeHasher.hash("123123"),
    });
    inMemoryClientRepository.items.push(client);
    const result = await sut.execute({
      email: "lucaslima78@hotmail.com",
      password: "123123",
    });
    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });
  it("should not be able to authenticate another client", async () => {
    const client = makeClient({
      email: "lucaslima78@hotmail.com",
      password: await fakeHasher.hash("123123"),
    });
    inMemoryClientRepository.items.push(client);
    const result = await sut.execute({
      email: "another-client@hotmail.com",
      password: "another-password",
    });
    expect(result.isLeft()).toBe(true);
    //expect(result.value).toBeInstanceOf(WrongCredentialsError)
  });
});
