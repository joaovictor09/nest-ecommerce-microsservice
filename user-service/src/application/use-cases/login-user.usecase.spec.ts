import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository';
import { LoginUserUseCase } from './login-user.usecase';
import { FakeHasher } from 'test/cryptography/fake-hasher';
import { randomUUID } from 'node:crypto';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { FakeEncrypter } from 'test/cryptography/fake-encrypter';

let fakeHasher: FakeHasher;
let usersRepository: InMemoryUsersRepository;
let fakeEncrypter: FakeEncrypter;
let sut: LoginUserUseCase;

describe('Login User Use Case', () => {
  beforeEach(() => {
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();
    usersRepository = new InMemoryUsersRepository();
    sut = new LoginUserUseCase(usersRepository, fakeHasher, fakeEncrypter);
  });

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      id: randomUUID(),
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      passwordHash: await fakeHasher.hash('123456'),
    });

    const result = await sut.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(result.isRight()).toBeTruthy();
    if (result.isRight()) {
      expect(result.value.accessToken).toEqual(expect.any(String));
    }
  });

  it('should not be able to authenticate with wrong username', async () => {
    const result = await sut.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      id: randomUUID(),
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      passwordHash: await fakeHasher.hash('123456'),
    });

    const result = await sut.execute({
      email: 'johndoe',
      password: '123123',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(InvalidCredentialsError);
  });
});
