import { Employ } from "@/domain/enterprise/entities/employ";
import type { EmployRepository } from "../repositories/employ-repository";
import type { NotAllowedError } from "./errors/Not-allowed-error";
import { right, type Either } from "@/core/either";

interface RegisterEmployUseCaseRequest {
  name: string;
  email: string;
  password: string;
}
type RegisterEmployUseCaseResponse = Either<
  NotAllowedError,
  { employ: Employ }
>;
export class RegisterEmployUseCase {
  constructor(private employRepository: EmployRepository) {}
  async execute({
    name,
    email,
    password,
  }: RegisterEmployUseCaseRequest): Promise<RegisterEmployUseCaseResponse> {
    const employId = Employ.create({
      name,
      email,
      password,
    });
    const employ = await this.employRepository.create(employId);
    return right({
      employ
    })
  }
}
