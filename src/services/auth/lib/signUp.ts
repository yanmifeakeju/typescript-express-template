import { UserService } from '../../../models/users';
import { CreateUserParams } from '../../../models/users/types';

export const signUpUser = async (data: CreateUserParams) => {
  const user = await UserService.createUser(data);
  return user;
  //generate jsonwebtoken
};
