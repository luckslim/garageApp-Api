import { InMemoryCheckInRepository } from "../../../../test/repositories/in-memory-check-in-repository";
import { MakeCheckIn } from "../../../../test/factories/make-checkIn";
import { DeleteCheckInClientUseCase } from "./delete-check-in";
import { InMemoryClientRepository } from "../../../../test/repositories/in-memory-clients-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/Not-allowed-error";

let inMemoryCheckInRepository: InMemoryCheckInRepository;
let inMemoryClientRepository: InMemoryClientRepository;
let sut: DeleteCheckInClientUseCase;

describe("delete CheckIn", () => {
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository();
    inMemoryClientRepository = new InMemoryClientRepository();
    sut = new DeleteCheckInClientUseCase(inMemoryCheckInRepository);
  });
  it("should be able to delete a checkIn", async () => {
    const checkInId = MakeCheckIn({
      clientId: new UniqueEntityID("lucas-Author"),
      vehicleId: "carro-1234",
    });
    inMemoryCheckInRepository.items.push(checkInId);
    await sut.execute({
      clientId: "lucas-Author",
      vehicleId: "carro-1234",
    });
    expect(inMemoryCheckInRepository.items).toHaveLength(0);
  });
    it("should not be able to delete another checkIn", async () => {
    const checkInId = MakeCheckIn({
      clientId: new UniqueEntityID("lucas-Author"),
      vehicleId: "carro-1234",
    });
    inMemoryCheckInRepository.items.push(checkInId);
    const result = await sut.execute({
      clientId: "another-id",
      vehicleId: "another-car",
    });
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  });
});
