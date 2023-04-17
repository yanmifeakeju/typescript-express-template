import { create } from '../lib/create';
import { UserRepository } from '../repositories';
import { IUserService } from './interface';

export const UserService: IUserService = {
  create: create(UserRepository)
};
