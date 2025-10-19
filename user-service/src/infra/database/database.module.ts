import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '@/domain/repositories/user.repository';
import { PrismaUserRepositories } from './prisma/repositories/prisma-user-repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepositories,
    },
  ],
  exports: [PrismaService, UserRepository],
})
export class DatabaseModule {}
