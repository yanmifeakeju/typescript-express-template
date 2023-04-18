import env from '../../../config/env';
import { createToken, decodeToken } from '../../../utils/jwt';
import { CreateUserParams } from '../../users/schema';
import { UserService } from '../../users/services';

export const registerUser = async (data: CreateUserParams) => {
  const registeredUser = await UserService.createProfile(data);
  const authToken = createToken<{ userId: string }>({ userId: registeredUser.id }, env.USER_JWT_SECRET, 3600);

  return { authToken };
};

export const decodeUserAuthToken = (token: string) => decodeToken<{ userId: string }>(token, env.USER_JWT_SECRET);

export const getUserProfile = (userId: string) => UserService.findProfile({ userId });

export const loginUser = ({ email, password }: { email: string; password: string }) => {
  throw new Error('Unimplemented.');
};
