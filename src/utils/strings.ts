import { createHash } from 'crypto';

export const hashString = (string: string, secret: string) => {
  return createHash('sha256').update(`${string}.${secret}`).digest('hex');
};
