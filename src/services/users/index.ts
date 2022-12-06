import { UserRepository } from './dataAccess';
import { CreateUserParams } from './types';
import { createNewUser } from './useCases/create';

export interface IUserService {
  createUser: (params: CreateUserParams) => Promise<{ userId: string }>;
  //verifyUserCredentials
  //userProfile
}

export const UserService: IUserService = {
  createUser: createNewUser(UserRepository)
};
