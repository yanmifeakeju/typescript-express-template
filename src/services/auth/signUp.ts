import { createNewUser } from '../../core/users/lib/create';
import { CreateUserParams } from '../../core/users/types';

export const signUpUser = async (data: CreateUserParams) => {
  const user = await createNewUser(data);
  return user;
};
