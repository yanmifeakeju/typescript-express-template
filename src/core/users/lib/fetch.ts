import { validate } from 'uuid';
import { verifyPassword } from '../../../lib/utils/password';
import { assertIsValid } from '../../../lib/validator';
import { EmailAndPasswordSchema } from '../schema';
import { UserProfile } from '../types';
import { UserErrorType, UserError } from './UserServiceError';
import { UserRepository } from '../../repository/User';

export const fetchProfile = async (userId: string): Promise<UserProfile> => {
  if (!validate(userId)) throw new UserError(UserErrorType.INVALID_ARGUMENT, 'Please provide a valid userId');
  const user = await UserRepository.findById(userId);

  if (!user) throw new UserError(UserErrorType.NOT_FOUND, 'User profile not found.');

  return {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    bio: user.bio
  };
};

export const validateAuthenticationCred = async (email: string, password: string): Promise<UserProfile> => {
  assertIsValid(EmailAndPasswordSchema, { email, password });
  const user = await UserRepository.find({ email });

  if (!user) throw new UserError(UserErrorType.NOT_FOUND, 'Invalid credentials.');

  if (!(await verifyPassword(password, user.password)))
    throw new UserError(UserErrorType.NOT_FOUND, 'Invalid credentials');

  return {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    bio: user.bio
  };
};
