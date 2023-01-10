import config from '../../config/config';
import { createToken } from '../../utils/jwt';

export const generateAuthenticationToken = (userId: string) => {
  return { error: null, data: { token: createToken({ userId }, config.USER_JWT_SECRET, 3600) } };
};
