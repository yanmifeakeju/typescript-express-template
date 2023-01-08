import { Prisma, PrismaClient } from '@prisma/client';

type UserModel = PrismaClient['user'];

export const save = (db: UserModel) => async (saveUserParams: Prisma.UserCreateInput) => {
  try {
    const user = await db.create({ data: { ...saveUserParams } });
    return user;
  } catch (error) {
    throw new Error('Error saving user');
  }
};
export const findById = (db: UserModel) => async (id: string) => {
  try {
    const user = await db.findFirst({ where: { id } });
    return user;
  } catch (error) {
    throw new Error('Error fetching user');
  }
};

export const find = (db: UserModel) => async (searchUserParams: Prisma.UserWhereUniqueInput) => {
  try {
    const user = await db.findFirst({ where: { ...searchUserParams } });
    return user;
  } catch (error) {
    throw new Error('Error fetching user');
  }
};

export const update =
  (db: UserModel) => async (whereParams: Prisma.UserWhereUniqueInput, updateParams: Prisma.UserUpdateInput) => {
    try {
      const user = await db.update({ where: { ...whereParams }, data: { ...updateParams } });
      return user;
    } catch (error) {
      throw new Error('Error fetching user');
    }
  };
