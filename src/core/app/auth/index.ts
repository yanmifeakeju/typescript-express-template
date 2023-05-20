import env from '../../../config/env';
import logger from '../../../shared/logger';
import { createToken, decodeToken } from '../../../utils/jwt';
import { CreateUserParams } from '../../users/schema';
import { UserService } from '../../users/services';

export const registerUser = async (data: CreateUserParams) => {
  const registeredUser = await UserService.createProfile(data);
  const authToken = createToken<{ sessionId: string }>({ sessionId: registeredUser.id }, env.USER_JWT_SECRET, 3600);

  return { authToken };
};

export const decodeUserAuthToken = (token: string, purpose: 'session-auth' | 'password-reset') => {
  if (purpose === 'session-auth') return decodeToken<{ sessionId: string }>(token, env.USER_JWT_SECRET);

  return decodeToken<{ sessionId: string }>(token, env.USER_JWT_SECRET);
};

export const getUserProfile = (userId: string) => UserService.findProfile({ userId });

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  const user = await UserService.validateAuthCreds(email, password);
  const authToken = createToken<{ userId: string }>({ userId: user.id }, env.USER_JWT_SECRET, 3600);

  return { authToken };
};

export const initiatePasswordReset = async (email: string) => {
  const { token } = await UserService.initiatePasswordReset(email);
  logger.info(token);
};

export const completePasswordReset = async (resetHash: string, token: string) => {
  throw new Error('unimplemented');
};

export const changePassword = async (
  userId: string,
  { oldPassword, newPassword }: { oldPassword: string; newPassword: string }
) => {
  throw new Error('unimplemented');
};
