import { EmailOrUserIdSchema } from '../schema';
import { AppError } from '../../../shared/errors/AppError';
import { assertIsValid } from '../../../utils/validator';
import { IUserRepository } from '../repositories/interface';

export const fetchUser =
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

// export const fetchWithAuthenticationCreds = async (email: string, password: string): Promise<UserProfile> => {
//   assertIsValid(EmailAndPasswordSchema, { email, password });
//   const user = await UserRepository.findUnique({ email }, postgresClient);

//   if (!user) throw new AppError('NOT_FOUND', 'Invalid credentials.');

//   if (!(await verifyPassword(password, user.password))) throw new AppError('NOT_FOUND', 'Invalid credentials');

//   return {
//     id: user.id,
//     email: user.email,
//     firstName: user.first_name,
//     lastName: user.last_name,
//     bio: user.bio
//   };
// };
