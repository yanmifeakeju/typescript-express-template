import { createToken, decodeToken } from '../../utils/jwt';

export const generateAuthenticationToken = (userId: string, secret: string) => {
  return { error: null, data: { token: createToken({ userId }, secret, 3600) } };
};

export const validateAuthenticationToken = (token: string, secret: string) => {
  try {
    const decoded = decodeToken<{ userId: string }>(token, secret);
    return { error: null, data: decoded };
  } catch (error) {
    return { error: new Error('Expired or invalid token'), data: null };
  }
};
