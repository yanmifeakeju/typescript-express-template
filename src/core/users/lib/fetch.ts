import { EmailAndPasswordSchema, EmailOrUserIdSchema, UserProfile } from '../schema';
import { AppError } from '../../../shared/errors/AppError';
import { assertIsValid } from '../../../utils/validator';
import { verifyPassword } from '../../../utils/password';
import { UserRepository } from '../../repository/user';
import { postgresClient } from '../../../infrastructure/postgres/connection';

export const fetchProfile = async ({ userId, email }: { userId?: string; email?: string }): Promise<UserProfile> => {
  assertIsValid(EmailOrUserIdSchema, { id: userId, email: email });

  const where = {
    ...(userId && { id: userId }),
    ...(email && { email })
  };
  const user = await UserRepository.findUnique({ ...where }, postgresClient);
  if (!user) throw new AppError('NOT_FOUND', 'User profile not found.');

  return {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    bio: user.bio
  };
};

export const fetchWithAuthenticationCreds = async (email: string, password: string): Promise<UserProfile> => {
  assertIsValid(EmailAndPasswordSchema, { email, password });
  const user = await UserRepository.findUnique({ email }, postgresClient);

  if (!user) throw new AppError('NOT_FOUND', 'Invalid credentials.');

  if (!(await verifyPassword(password, user.password))) throw new AppError('NOT_FOUND', 'Invalid credentials');

  return {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    bio: user.bio
  };
};
