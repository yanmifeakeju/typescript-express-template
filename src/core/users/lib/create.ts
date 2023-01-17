import { assertIsValid } from '../../../utils/validator';
import { hashPassword } from '../../../utils/password';
import { CreateUserParamSchema } from '../schema';
import { CreateUserParams } from '../types';
import { UserErrorType, UserError } from '../../errors/UserError';
import { UserRepository } from '../../repository/user';
import { postgresClient } from '../../../infrastructure/postgres/connection';

export const create = async ({ firstName, lastName, bio = null, email, password }: CreateUserParams) => {
  assertIsValid(CreateUserParamSchema, { firstName, lastName, bio, email, password });

  const findDuplicateRecord = await UserRepository.find({ email }, postgresClient);
  if (findDuplicateRecord) throw new UserError(UserErrorType.DUPLICATE_ENTRY, 'Email already exists.');

  const { id } = await UserRepository.create(
    {
      email,
      first_name: firstName,
      last_name: lastName,
      bio: bio,
      password: await hashPassword(password)
    },
    postgresClient
  );

  return { userId: id };
};
