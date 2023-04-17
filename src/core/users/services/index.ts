import { create } from '../lib/create';
import { fetch } from '../lib/fetch';
import { UserRepository } from '../repositories';
import { IUserService } from './interface';

export const UserService: IUserService = {
  createProfile: create(UserRepository),
  findProfile: fetch(UserRepository)
};
