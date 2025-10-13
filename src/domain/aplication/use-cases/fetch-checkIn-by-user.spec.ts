import { InMemoryCheckInRepository } from "../../../../test/repositories/in-memory-check-in-repository";
import { MakeCheckIn } from "../../../../test/factories/make-checkIn";
import { InMemoryClientRepository } from "../../../../test/repositories/in-memory-clients-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { FetchCheckInByUserUseCase } from "./fetch-checkIn-by-user";
import { makeClient } from "test/factories/make-client";

let inMemoryCheckInRepository: InMemoryCheckInRepository;
let inMemoryClientRepository: InMemoryClientRepository;
let sut: FetchCheckInByUserUseCase;

describe("Fetch checkIn by User", () => {
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository();
    inMemoryClientRepository = new InMemoryClientRepository();
    sut = new FetchCheckInByUserUseCase(inMemoryCheckInRepository,inMemoryClientRepository);
  });
  it("should be able to fetch a checkIn by user", async () => {
    const user = makeClient({
        email: "lucaslima78@hotmail.com"
    })
    const checkIn = MakeCheckIn({
        clientId: new UniqueEntityID('1')
    })

    inMemoryClientRepository.items.push(user)
    inMemoryCheckInRepository.items.push(checkIn)
    
    const result = await sut.execute({
        email : user.email
    })
    
    expect(inMemoryCheckInRepository.items[0]).toBeTruthy()
    expect(result.isRight()).toBe(true)
  });
});
