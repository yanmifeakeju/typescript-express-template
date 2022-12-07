import { hashPassword } from '../../../lib/utils/password';
import { assertIsValid } from '../../../lib/validator';
import { IUserRepository } from '../repository';
import { CreateUserParamSchema } from '../schema';
import { CreateUserParams } from '../types';
import { UserErrorType, UserServiceError } from './UserServiceError';

export const createNewUser = (repository: IUserRepository) => async (data: CreateUserParams) => {
  assertIsValid(CreateUserParamSchema, data);

  const findDuplicateRecord = await repository.findDuplicateRecord(data.email);
  if (findDuplicateRecord) throw new UserServiceError(UserErrorType.DUPLICATE_ENTRY, 'Email already exist.');

  const { id } = await repository.createUser({ ...data, password: await hashPassword(data.password) });

  return { userId: id };
};
