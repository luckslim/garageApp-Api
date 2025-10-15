import { FakeHasher } from 'test/cryptography/fake-hasher';
import { InMemoryClientRepository } from '../../../../test/repositories/in-memory-clients-repository';
import { RegisterClientUseCase } from './register-client';

let inMemoryClientRepository: InMemoryClientRepository;
let fakeHasher: FakeHasher;
let sut: RegisterClientUseCase;

describe('register Client', () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository();
    fakeHasher = new FakeHasher();
    sut = new RegisterClientUseCase(inMemoryClientRepository, fakeHasher);
  });
  it('should be able to register a new client', async () => {
    await sut.execute({
      name: 'lucas soares lima',
      email: 'lucaslima78@hotmail.com',
      password: '123',
    });
    const client = inMemoryClientRepository.items[0];
    expect(client).toBeTruthy();
    expect(client?.name).toBe('lucas soares lima');
  });
  it('should hashed student password upon registration', async () => {
    const hashedPassword = await fakeHasher.hash('123')
    const result = await sut.execute({
      name: 'lucas soares lima',
      email: 'lucaslima78@hotmail.com',
      password: hashedPassword,
    });
    const client = inMemoryClientRepository.items[0];
    expect(client).toBeTruthy();
  });
});
