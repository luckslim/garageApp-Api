import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeClient } from '../../../../test/factories/make-client';
import { NotAllowedError } from './errors/Not-allowed-error';
import { GetCheckInByUserUseCase } from './get-checkIn-by-user';
import { InMemoryCheckInRepository } from 'test/repositories/in-memory-check-in-repository';
import { InMemoryCheckInFilesRepository } from 'test/repositories/in-memory-check-in-files-repository';
import { MakeCheckIn } from 'test/factories/make-checkIn';
import { right } from '@/core/either';

let inMemoryCheckInRepository: InMemoryCheckInRepository;
let inMemorycheckInFilesRepository: InMemoryCheckInFilesRepository;
let sut: GetCheckInByUserUseCase;

describe('Get CheckIn', () => {
  beforeEach(() => {
    inMemorycheckInFilesRepository = new InMemoryCheckInFilesRepository();
    inMemoryCheckInRepository = new InMemoryCheckInRepository(
      inMemorycheckInFilesRepository,
    );
    sut = new GetCheckInByUserUseCase(inMemoryCheckInRepository);
  });
  it('should be able get to checkIn by userId', async () => {
    const clientId = new UniqueEntityID('lucas-123').toString();
    for (let i = 0; i < 10; i++) {
      const checkIn = MakeCheckIn({
        clientId,
      });
      const moreCheckIn = MakeCheckIn()
      inMemoryCheckInRepository.items.push(checkIn,moreCheckIn);
    }
    const result = await sut.execute({
      clientId,
      page: 1,
    });
    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      // Acessa a propriedade checkIn do objeto retornado
      expect(result.value.checkIn).toHaveLength(2);

      // Verifica se todos os check-ins são do usuário correto
      result.value.checkIn.forEach((checkIn) => {
        expect(checkIn.clientId.toString()).toBe(clientId);
      });

      // Verificação adicional da estrutura
      expect(result.value).toHaveProperty('checkIn');
      expect(Array.isArray(result.value.checkIn)).toBe(true);
    }
  });
});
