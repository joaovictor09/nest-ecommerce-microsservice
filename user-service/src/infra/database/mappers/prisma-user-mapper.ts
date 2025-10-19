import { User } from '@/domain/entities/user.entity';
import { User as PrismaUser, Prisma } from '@prisma/client';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return new User(raw.id, raw.email, raw.name, raw.password);
  }

  static toPrisma(raw: User): Prisma.UserUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      email: raw.email,
      name: raw.name,
      password: raw.passwordHash,
    };
  }
}
