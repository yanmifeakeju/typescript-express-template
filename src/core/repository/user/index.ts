import { Prisma, User } from '@prisma/client';
import { DB } from '../../../infrastructure/postgres/connection';
import { DatabaseError } from '../../../shared/errors/DatabaseError';

interface IUserRepository {
  readonly create: (data: Omit<Prisma.UserCreateInput, 'id'>, db: DB) => Promise<User>;
  readonly update: (where: Prisma.UserWhereUniqueInput, update: Prisma.UserUpdateInput, db: DB) => Promise<User | null>;
  readonly find: (where: Prisma.UserWhereInput, db: DB) => Promise<User | null>;
  readonly findUnique: (where: Prisma.UserWhereUniqueInput, db: DB) => Promise<User | null>;
  readonly findMany: (where: Prisma.UserWhereInput, db: DB) => Promise<User[]>;
}

export const UserRepository: IUserRepository = {
  async create({ first_name, last_name, email, password, bio }, db) {
    try {
      return await db.user.create({
        data: {
          first_name,
          last_name,
          email,
          password,
          bio
        }
      });
    } catch (error) {
      throw new DatabaseError(`Error creating user.`, error);
    }
  },

  async update(where, updateParams, db) {
    try {
      return await db.user.update({ where: { ...where }, data: { ...updateParams } });
    } catch (error) {
      throw new DatabaseError('Error updating user information.', error);
    }
  },
  async find(where, db) {
    try {
      return await db.user.findFirst({ where: { ...where } });
    } catch (error) {
      throw new DatabaseError('Error fetching user record', error);
    }
  },

  async findUnique(where, db) {
    try {
      return await db.user.findUnique({ where: { ...where } });
    } catch (error) {
      throw new DatabaseError('Error fetching user record', error);
    }
  },

  async findMany(where, db) {
    try {
      return await db.user.findMany({ where: { ...where } });
    } catch (error) {
      throw new DatabaseError('Error fetching user record', error);
    }
  }
};
