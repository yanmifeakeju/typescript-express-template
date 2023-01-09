import config from '../../config/config';
import { createAuthToken } from '../../lib/utils/jwt';

export const generateAuthenticationToken = (userId: string) => {
  return { error: null, data: { token: createAuthToken({ userId }, config.USER_JWT_SECRET, 3600) } };
};
