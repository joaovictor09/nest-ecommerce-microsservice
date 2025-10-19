import { UserRepository } from '@/domain/repositories/user.repository';
import { LoginUserDTO } from '../dto/login-user.dto';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { Either, left, right } from '../utils/either';
import { HashComparer } from '@/application/criptography/hash-comparer';
import { Encrypter } from '@/application/criptography/encrypter';
import { Injectable } from '@nestjs/common';

type AuthenticateUseCaseResponse = Either<
  InvalidCredentialsError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async execute(data: LoginUserDTO): Promise<AuthenticateUseCaseResponse> {
    const { email, password } = data;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new InvalidCredentialsError());
    }

    const passwordMatch = await this.hashComparer.compare(
      password,
      user.passwordHash,
    );

    if (!passwordMatch) {
      return left(new InvalidCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id,
    });

    return right({
      accessToken,
    });
  }
}
