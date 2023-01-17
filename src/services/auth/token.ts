import config from '../../config/config';
import { createToken, decodeToken } from '../../utils/jwt';

export const generateAuthenticationToken = (userId: string) => {
  return { error: null, data: { token: createToken({ userId }, config.USER_JWT_SECRET, 3600) } };
};

export const validateAuthenticationToken = (token: string) => {
  try {
    const decoded = decodeToken<{ userId: string }>(token, config.USER_JWT_SECRET);
    return { error: null, data: decoded };
  } catch (error) {
    return { error: new Error('Expired or invalid token'), data: null };
  }
};
