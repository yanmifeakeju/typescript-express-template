import { register } from '../../core/users/lib/create';
import { CreateUserParams } from '../../core/users/types';

export const signUpUser = async (data: CreateUserParams) => {
  const user = await register(data);
  return user;
};
