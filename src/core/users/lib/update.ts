import { validate } from 'uuid';
import { assertIsValid } from '../../../utils/validator';
import { UpdateUserParam, UpdateUserSchema } from '../schema';
import { AppError } from '../../../shared/errors/AppError';
import { hashPassword } from '../../../utils/password';

import { IUserRepository } from '../repositories/interface';
import { RequireAtLeastOne } from '../../../shared/types';

export const update =
  (userRepository: IUserRepository) => async (userId: string, updateParams: RequireAtLeastOne<UpdateUserParam>) => {
    if (!validate(userId)) throw new AppError('ILLEGAL_ARGUMENT', 'Invalid user ID');
    assertIsValid(UpdateUserSchema, { ...updateParams });

    const user = await userRepository.selectUserById(userId);
    if (!user) throw new AppError('NOT_FOUND', 'User not found.');

    if (!Object.keys(updateParams).length) throw new AppError('ILLEGAL_ARGUMENT', 'No user update entry');

    await userRepository.updateUser(userId, {
      ...updateParams,
      ...(updateParams.password && { password: await hashPassword(updateParams.password) })
    });
  };
