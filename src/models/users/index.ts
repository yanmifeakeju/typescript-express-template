import { UserRepository } from './repository';
import { CreateUserParams } from './types';
import { createNewUser } from './lib/create';

export interface IUserService {
  createUser: (params: CreateUserParams) => Promise<{ userId: string }>;

  //verify
  //verifyUserCredentials
  //userProfile
}

export interface IUserModel {
  createUser: (params: CreateUserParams) => Promise<{ userId: string }>;
  //verify
  //verifyUserCredentials
  //verifyUserCredentials
  //userProfile
}

export const UserModel: IUserModel = {
  createUser: createNewUser(UserRepository)
};

export const UserService: IUserService = {
  createUser: createNewUser(UserRepository)
};
