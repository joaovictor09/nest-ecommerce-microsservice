import { HashGenerator } from '@/domain/criptography/hash-generator';
import { UserRepository } from '@/domain/repositories/user.repository';
import { RegisterUserDTO } from '../dto/register-user.dto';
import { Either, left, right } from '../utils/either';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { User } from '@/domain/entities/user.entity';

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User;
  }
>;

export class RegisterUserUseCase {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly hasher: HashGenerator,
  ) {}

  async execute(data: RegisterUserDTO): Promise<RegisterUserUseCaseResponse> {
    const { email, name, password } = data;
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      return left(new UserAlreadyExistsError());
    }

    const passwordHash = await this.hasher.hash(password);
    const id = crypto.randomUUID();

    const user = new User(id, name, email, passwordHash);

    await this.usersRepository.create(user);

    return right({
      user,
    });
  }
}
