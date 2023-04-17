import env from '../../../config/env';
import { createToken, decodeToken } from '../../../utils/jwt';
import { CreateUserParams } from '../../users/schema';
import { UserService } from '../../users/services';

export const registerUser = async (data: CreateUserParams) => {
  const registeredUser = await UserService.createProfile(data);
  const authToken = createToken<{ userId: string }>({ userId: registeredUser.id }, env.USER_JWT_SECRET, 3600);

  return { authToken };
};

export const decodeUserAuthToken = (token: string) => {
  const decoded = decodeToken<{ userId: string }>(token, env.USER_JWT_SECRET);
  return decoded;
};

export const getUserProfile = (userId: string) => UserService.findProfile({ userId });

export const loginUser = (data: unknown) => {
  throw new Error('Unimplemented.');
};
