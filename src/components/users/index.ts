import { UserRepository } from './repository';
import { CreateUserParams } from './types';
import { createNewUser } from './lib/create';

export interface IUserService {
  createUser: (params: CreateUserParams) => Promise<{ userId: string }>;
  //verifyUserCredentials
  //userProfile
}

export const UserService: IUserService = {
  createUser: createNewUser(UserRepository)
};
