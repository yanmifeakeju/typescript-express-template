import { Prisma, PrismaClient, User } from '@prisma/client';
import { find, findById, save, update } from './query';

export interface IUserRepository {
  readonly update: (where: Prisma.UserWhereUniqueInput, update: Prisma.UserUpdateInput) => Promise<User | null>;
  readonly findById: (id: string) => Promise<User | null>;
  readonly find: (searchUserParams: Prisma.UserWhereUniqueInput) => Promise<User | null>;
  readonly save: (saveUserParams: Prisma.UserCreateInput) => Promise<User>;
}

export const Repository = (db: PrismaClient): IUserRepository => {
  return {
    save: save(db),
    findById: findById(db),
    find: find(db),
    update: update(db)
  };
};
