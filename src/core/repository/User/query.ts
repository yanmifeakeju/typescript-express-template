import { Prisma, PrismaClient } from '@prisma/client';
import { createDatabaseError } from '../../errors/DatabaseError';

export const save = (db: PrismaClient) => async (saveUserParams: Prisma.UserCreateInput) => {
  try {
    const user = await db.user.create({ data: { ...saveUserParams } });
    return user;
  } catch (error) {
    throw new Error('Error saving user');
  }
};
export const findById = (db: PrismaClient) => async (id: string) => {
  try {
    const user = await db.user.findFirst({ where: { id } });
    return user;
  } catch (error) {
    createDatabaseError(error as Error, `Error fetching user with ${id}`);
  }
};

export const find = (db: PrismaClient) => async (searchUserParams: Prisma.UserWhereUniqueInput) => {
  try {
    const user = await db.user.findFirst({ where: { ...searchUserParams } });
    return user;
  } catch (error) {
    createDatabaseError(error as Error, ' Error occurred fetching user');
  }
};

export const update =
  (db: PrismaClient) => async (whereParams: Prisma.UserWhereUniqueInput, updateParams: Prisma.UserUpdateInput) => {
    try {
      const user = await db.user.update({ where: { ...whereParams }, data: { ...updateParams } });
      return user;
    } catch (error) {
      createDatabaseError(error as Error, 'Error fetching user');
    }
  };
