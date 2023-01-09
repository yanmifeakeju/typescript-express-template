import { register } from '../../core/users/lib/create';
import { CreateUserParams } from '../../core/users/types';

import { handleError } from '../helpers/errors';

export const signUpUser = async (data: CreateUserParams) => {
  try {
    const { userId } = await register(data);
    return { error: null, data: { userId } };
  } catch (error) {
    return handleError(error as Error);
  }
};
