import { assertIsValid } from '../../../utils/validator';
import { hashPassword } from '../../../utils/password';
import { CreateUserParamSchema, CreateUserParams } from '../schema';
import { AppError } from '../../../shared/errors/AppError';
import { IUserRepository } from '../repositories/interface';
import { ICacheService } from '../../../shared/cache/interface';
import randomstring from 'randomstring';

export const createUser =
  (userRepository: IUserRepository) =>
  async ({ firstName, lastName, bio = null, email, password }: CreateUserParams) => {
    assertIsValid(CreateUserParamSchema, { firstName, lastName, bio, email, password });

    const findDuplicateRecord = await userRepository.selectUserByEmail(email);
    if (findDuplicateRecord) throw new AppError('DUPLICATE_ENTRY', 'Email already exists.');

    const user = await userRepository.insertUser({
      email,
      firstName,
      lastName,
      bio: bio,
      password: await hashPassword(password)
    });

    return user;
  };

export const createPasswordResetToken =
  (cache: ICacheService, userRepository: IUserRepository) => async (email: string) => {
    const user = await userRepository.selectUserByEmail(email);
    if (!user) throw new AppError('ILLEGAL_ARGUMENT', 'Invalid credentials');

    const token = randomstring.generate({ length: 6, charset: 'numeric' });
    await cache.set(`password:reset:${token}`, user.id, 1);

    return token;
  };
