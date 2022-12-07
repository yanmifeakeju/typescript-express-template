import { CreateUserParams } from '../types';
import { UserErrorType, UserServiceError } from '../lib/UserServiceError';
import { postgresClient } from '../../../infrastructure/postgres/connection';
import { Prisma, User } from '@prisma/client';

export interface IUserRepository {
  createUser(data: CreateUserParams): Promise<User>;
  findDuplicateRecord(email: string): Promise<Partial<User> | null>;
  findUser(params: Prisma.UserWhereUniqueInput): Promise<User>;
}

export const UserRepository: IUserRepository = {
  async createUser({ firstName, lastName, password, email, bio }) {
    return postgresClient.user.create({
      data: { first_name: firstName, last_name: lastName, email, password, bio }
    });
  },

  async findDuplicateRecord(email) {
    const user = await postgresClient.user.findFirst({
      where: { email },
      select: { first_name: true, last_name: true, email: true }
    });

    return user;
  },

  async findUser(params) {
    const user = await postgresClient.user.findFirst({ where: { ...params } });
    if (!user) throw new UserServiceError(UserErrorType.NOT_FOUND, 'Sorry, we could not find your account.');
    return user;
  }
};
