import { UserRepository } from '@/domain/repositories/user.repository';
import { PrismaService } from '../prisma.service';
import { User } from '@/domain/entities/user.entity';
import { PrismaUserMapper } from '../../mappers/prisma-user-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepositories implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async create(data: User): Promise<User> {
    const user = await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(data),
    });

    return PrismaUserMapper.toDomain(user);
  }
}
