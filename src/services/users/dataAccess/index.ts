import { CreateUserParams } from '../types';
import { UserErrorType, UserServiceError } from '../UserServiceError';
import { postgresClient } from '../../../infrastructure/database/postgres/connection';
import { User } from '@prisma/client';

export interface IUserRepository {
  createUser(data: CreateUserParams): Promise<{ userId: string }>;
  findDuplicateRecord(email: string): Promise<Partial<User> | null>;
}

export const UserRepository: IUserRepository = {
  async createUser({ firstName, lastName, password, email, bio }: CreateUserParams) {
    const existingUser = await postgresClient.user.findFirst({ where: { email } });
    if (existingUser) {
      throw new UserServiceError(UserErrorType.DUPLICATE_ENTRY, 'Email already exist.');
    }

    const user = await postgresClient.user.create({
      data: { first_name: firstName, last_name: lastName, email, password, bio }
    });
    return { userId: user.id };
  },

  async findDuplicateRecord(email: string) {
    const user = await postgresClient.user.findFirst({
      where: { email },
      select: { first_name: true, last_name: true, email: true }
    });

    return user;
  }
};
