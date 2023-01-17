import { assertIsValid } from '../../../utils/validator';
import { hashPassword } from '../../../utils/password';

import { CreateUserParamSchema } from '../schema';
import { CreateUserParams } from '../types';
import { UserErrorType, UserError } from '../../errors/UserError';
import { UserRepository } from '../../repository/user';
import { postgresClient } from '../../../infrastructure/postgres/connection';

export const create = async (data: CreateUserParams) => {
  assertIsValid(CreateUserParamSchema, data);

  const findDuplicateRecord = await UserRepository.find({ email: data.email }, postgresClient);
  if (findDuplicateRecord) throw new UserError(UserErrorType.DUPLICATE_ENTRY, 'Email already exist.');

  const { id } = await UserRepository.create(
    {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      bio: data.bio,
      password: await hashPassword(data.password)
    },
    postgresClient
  );

  return { userId: id };
};
