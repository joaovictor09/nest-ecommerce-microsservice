import { LoginUserDTO } from '@/application/dto/login-user.dto';
import { RegisterUserDTO } from '@/application/dto/register-user.dto';
import { InvalidCredentialsError } from '@/application/errors/invalid-credentials-error';
import { UserAlreadyExistsError } from '@/application/errors/user-already-exists-error';
import { LoginUserUseCase } from '@/application/use-cases/login-user.usecase';
import { RegisterUserUseCase } from '@/application/use-cases/register-user.usecase';
import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

@Controller('/users')
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post()
  async registerUser(@Body() user: RegisterUserDTO) {
    const response = await this.registerUserUseCase.execute(user);

    if (response.isLeft()) {
      if (response.value instanceof UserAlreadyExistsError) {
        throw new ConflictException('User already exists');
      }

      throw new ForbiddenException('Unexpected error');
    }

    if (response.isRight()) {
      const { id } = response.value.user;
      return { id };
    }
  }

  @Post('/login')
  async loginUser(@Body() data: LoginUserDTO) {
    const response = await this.loginUserUseCase.execute(data);

    if (response.isLeft()) {
      if (response.value instanceof InvalidCredentialsError) {
        throw new UnauthorizedException('Invalid credentials');
      }

      throw new ForbiddenException('Unexpected error');
    }

    if (response.isRight()) {
      const { accessToken } = response.value;
      return { accessToken };
    }
  }
}
