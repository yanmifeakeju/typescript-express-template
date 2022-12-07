import { validate } from 'uuid';
import { verifyPassword } from '../../../lib/utils/auth';
import { assertIsValid } from '../../../lib/validator';
import { UserRepository } from '../repository';
import { EmailAndPasswordSchema } from '../schema';
import { UserProfile } from '../types';
import { UserErrorType, UserServiceError } from './UserServiceError';

export const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
  if (!validate(userId)) throw new UserServiceError(UserErrorType.INVALID_ARGUMENT, 'Please provide a userId');
  const user = await UserRepository.findUser({ id: userId });

  return {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    bio: user.bio
  };
};

export const fetchUserWithAuthenticationCred = async (email: string, password: string): Promise<UserProfile> => {
  assertIsValid(EmailAndPasswordSchema, { email, password });
  const user = await UserRepository.findUser({ email });

  if (!(await verifyPassword(password, user.password)))
    throw new UserServiceError(UserErrorType.ILLEGAL_ARGUMENT, 'Incorrect credentials');

  return {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    bio: user.bio
  };
};
