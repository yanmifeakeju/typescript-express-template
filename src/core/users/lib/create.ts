import { hashPassword } from '../../../lib/utils/password';
import { assertIsValid } from '../../../lib/validator';
import { UserRepository } from '../../repository/User';
import { CreateUserParamSchema } from '../schema';
import { CreateUserParams } from '../types';
import { UserErrorType, UserError } from './UserError';

export const register = async (data: CreateUserParams) => {
  assertIsValid(CreateUserParamSchema, data);

  const findDuplicateRecord = await UserRepository.find({ email: data.email });
  if (findDuplicateRecord) throw new UserError(UserErrorType.DUPLICATE_ENTRY, 'Email already exist.');

  const { id } = await UserRepository.save({
    email: data.email,
    first_name: data.firstName,
    last_name: data.lastName,
    bio: data.bio,
    password: await hashPassword(data.password)
  });

  return { userId: id };
};
