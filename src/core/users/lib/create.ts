import { hashPassword } from '../../../lib/utils/password';
import { assertIsValid } from '../../../lib/validator';
import { UserRepository } from '../../repository/User';
import { CreateUserParamSchema } from '../schema';
import { CreateUserParams } from '../types';
import { UserErrorType, UserServiceError } from './UserServiceError';

export const createNewUser = async (data: CreateUserParams) => {
  assertIsValid(CreateUserParamSchema, data);

  const findDuplicateRecord = await UserRepository.find({ email: data.email });
  if (findDuplicateRecord) throw new UserServiceError(UserErrorType.DUPLICATE_ENTRY, 'Email already exist.');

  const { id } = await UserRepository.save({
    email: data.email,
    first_name: data.firstName,
    last_name: data.lastName,
    password: await hashPassword(data.password)
  });

  return { userId: id };
};
