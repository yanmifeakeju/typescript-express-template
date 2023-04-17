import { assertIsValid } from '../../../utils/validator';
import { hashPassword } from '../../../utils/password';
import { CreateUserParamSchema, CreateUserParams } from '../schema';
import { AppError } from '../../../shared/errors/AppError';
import { IUserRepository } from '../repositories/interface';

export const create =
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
