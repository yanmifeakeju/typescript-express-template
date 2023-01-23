import { createHash } from 'crypto';
import { fetchProfile } from '../../core/users/lib/fetch';
import randomstring from 'randomstring';
import { redis } from '../../infrastructure/redis';
import { update } from '../../core/users/lib/update';

export const initiateUserPasswordReset = async (email: string) => {
  const user = await fetchProfile({ email });
  const token = randomstring.generate({ length: 6, charset: 'numeric' });
  const hash = createHash('sha256').update(token).digest('hex');

  await redis.setex(hash, 1800, user.id);

  //TODO:: send email for the token

  return { error: null, data: { userId: user.id, token } };
};

export const completeUserPasswordReset = async (id: string, token: string, password: string) => {
  const hash = createHash('sha256').update(token).digest('hex');

  const userId = await redis.get(hash);
  if (!userId || userId !== id) return { error: new Error('Expired or invalid token'), data: null };

  await redis.del(hash);
  await update(userId, { password });
  return { error: null, data: 'User profile updated.' };
};

export const changeUserPassword = async ({
  userId,
  oldPassword,
  newPassword
}: {
  userId: string;
  oldPassword: string;
  newPassword: string;
}) => {
  const user = await fetchProfile({ userId });
  if (!user) return;
  throw new Error('unimplemented.');
};
