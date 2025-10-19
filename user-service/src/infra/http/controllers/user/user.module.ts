import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { RegisterUserUseCase } from '@/application/use-cases/register-user.usecase';
import { DatabaseModule } from '@/infra/database/database.module';
import { CryptographyModule } from '@/infra/criptography/cryptography-module';
import { LoginUserUseCase } from '@/application/use-cases/login-user.usecase';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [UserController],
  providers: [RegisterUserUseCase, LoginUserUseCase],
})
export class UserModule {}
