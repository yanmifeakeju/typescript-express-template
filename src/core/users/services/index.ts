import { Cache } from '../../../shared/cache';
import { createPasswordResetToken, createUser } from '../lib/create';
import { findUser, findWithAuthenticationCreds } from '../lib/fetch';
import { UserRepository } from '../repositories';
import { IUserService } from './interface';

export const UserService: IUserService = {
  createProfile: createUser(UserRepository),
  findProfile: findUser(UserRepository),
  validateAuthCreds: findWithAuthenticationCreds(UserRepository),
  initiatePasswordReset: createPasswordResetToken(Cache, UserRepository)
};
