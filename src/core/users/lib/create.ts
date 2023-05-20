import { assertIsValid } from '../../../utils/validator';
import { hashPassword } from '../../../utils/password';
import { CreateUserParamSchema, CreateUserParams } from '../schema';
import { AppError } from '../../../shared/errors/AppError';
import { IUserRepository } from '../repositories/interface';
import randomstring from 'randomstring';
import { createHash } from 'node:crypto';
import env from '../../../config/env';
import { Redis } from 'ioredis';
import logger from '../../../shared/logger';

export const createUser =
  (userRepository: IUserRepository) =>
  async ({ firstName, lastName, bio = null, email, password }: CreateUserParams) => {
    assertIsValid(CreateUserParamSchema, { firstName, lastName, bio, email, password });

    const findDuplicateRecord = await userRepository.selectUserByEmail(email);
    if (findDuplicateRecord) throw new AppError('DUPLICATE_ENTRY', 'Email already exists.');

    const user = await userRepository.insertUser({
      email,
      firstName,
      lastName,
      bio: bio,
      password: await hashPassword(password)
    });

    return user;
  };

export const createPasswordResetToken =
  (redisClient: Redis, userRepository: IUserRepository) => async (email: string) => {
    const user = await userRepository.selectUserByEmail(email);
    if (!user) throw new AppError('INVALID_ARGUMENT', 'Invalid credentials');

    await checkBannedRequest(redisClient, email);
    await checkResetRequestCount(redisClient, email);

    const token = randomstring.generate({ length: 6, charset: 'numeric' });

    const data = `${token}.${env.PASSWORD_RESET_SECRET}`;
    const key = createHash('sha256').update(data).digest('hex');

    logger.info(token);

    await redisClient.setex(key, 900, email);

    return { token };
  };

async function checkBannedRequest(redisClient: Redis, email: string) {
  const key = `password:request:ban:${email}`;
  const isBanned = await redisClient.get(key);
  if (isBanned) throw new AppError('FORBIDDEN', 'Email is currently banned from making this request.');
}

async function checkResetRequestCount(redisClient: Redis, email: string) {
  const key = `password:request:count:${email}`;
  await redisClient.incr(key);

  const numberOfRequestWithinMinute = Number(await redisClient.get(key));

  logger.info(`Email has made ${numberOfRequestWithinMinute}.`);

  if (numberOfRequestWithinMinute >= 2) {
    if (numberOfRequestWithinMinute >= 5) await banEmail(redisClient, email);
    throw new AppError('TOO_MANY_REQUESTS', 'Too many requests. Please try again later.');
  }
}

async function banEmail(redisClient: Redis, email: string) {
  const key = `password:request:ban:${email}`;
  await redisClient.setex(key, 1800, 'true');
  //? Send a notification or perform other actions when email is banned
}
