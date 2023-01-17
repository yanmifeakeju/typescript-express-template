import { create } from '../../core/users/lib/create';
import { CreateUserParams } from '../../core/users/types';
import { handleError } from '../helpers/errors';

export const registerUser = async (data: CreateUserParams) => {
  try {
    const { userId } = await create(data);
    return { error: null, data: { userId } };
  } catch (error) {
    return handleError(error as Error);
  }
};
