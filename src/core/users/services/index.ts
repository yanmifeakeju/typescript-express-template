import { createUser } from '../lib/create';
import { fetchUser } from '../lib/fetch';
import { UserRepository } from '../repositories';
import { IUserService } from './interface';

export const UserService: IUserService = {
  createProfile: createUser(UserRepository),
  findProfile: fetchUser(UserRepository)
};
