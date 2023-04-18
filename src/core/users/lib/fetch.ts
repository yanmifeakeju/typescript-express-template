import { EmailAndPasswordSchema, EmailOrUserIdSchema, UserProfile } from '../schema';
import { AppError } from '../../../shared/errors/AppError';
import { assertIsValid } from '../../../utils/validator';
import { IUserRepository } from '../repositories/interface';
import { verifyPassword } from '../../../utils/password';

export const findUser =
  (userRepository: IUserRepository) =>
  async ({ userId, email }: { userId?: string; email?: string }) => {
    assertIsValid(EmailOrUserIdSchema, { id: userId, email: email });

    const user =
      (email && (await userRepository.selectUserByEmail(email))) ||
      (userId && (await userRepository.selectUserById(userId)));

    if (!user || typeof user === 'string') throw new AppError('NOT_FOUND', 'User profile not found.');

    return {
      bio: user.bio,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id
    };
  };

export const findWithAuthenticationCreds =
  (userRepository: IUserRepository) =>
  async (userEmail: string, password: string): Promise<UserProfile> => {
    assertIsValid(EmailAndPasswordSchema, { email: userEmail, password });
    const user = await userRepository.selectUserByEmail(userEmail);
    if (!user) throw new AppError('NOT_FOUND', 'Invalid credentials.');

    if (!(await verifyPassword(password, user.password))) throw new AppError('NOT_FOUND', 'Invalid credentials');

    const { id, email, firstName, lastName, bio } = user;

    return {
      id,
      email,
      firstName,
      lastName,
      bio
    };
  };
