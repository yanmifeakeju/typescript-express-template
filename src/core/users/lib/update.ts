import { validate } from 'uuid';
import { assertIsValid } from '../../../utils/validator';
import { UpdateUserSchema } from '../schema';
import { UpdateUserParam } from '../types';
import { UserError, UserErrorType } from '../../errors/UserError';
import { UserRepository } from '../../repository/user';
import { hashPassword } from '../../../utils/password';
import { postgresClient } from '../../../infrastructure/postgres/connection';

export const update = async (userId: string, updateParams: UpdateUserParam) => {
  if (!validate(userId)) throw new UserError(UserErrorType.INVALID_ARGUMENT, 'Invalid user ID');
  assertIsValid(UpdateUserSchema, { ...updateParams });

  const user = await UserRepository.findUnique({ id: userId }, postgresClient);
  if (!user) throw new UserError(UserErrorType.NOT_FOUND, 'User not found.');

  if (Object.keys(updateParams).length) {
    const data = {
      first_name: updateParams.firstName,
      last_name: updateParams.lastName,
      email: updateParams.email,
      password: updateParams.password
    };

    await UserRepository.update(
      { id: userId },
      { ...data, ...(data.password && { password: await hashPassword(data.password) }) },
      postgresClient
    );
  }
};
