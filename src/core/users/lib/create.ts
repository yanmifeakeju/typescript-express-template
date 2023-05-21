import { assertIsValid } from '../../../utils/validator';
import { hashPassword } from '../../../utils/password';
import { CreateUserParamSchema, CreateUserParams } from '../schema';
import { AppError } from '../../../shared/errors/AppError';
import { IUserRepository } from '../repositories/interface';
import randomstring from 'randomstring';
import env from '../../../config/env';
import { Redis } from 'ioredis';
import logger from '../../../shared/logger';
import { UsersConstants } from '../../../shared/constants';
import { hashString } from '../../../utils/strings';
import { encrypt } from '../../../utils/encrypt';

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
    if (!user) throw new AppError('INVALID_ARGUMENT', 'Invalid credentials.');

    await checkBannedRequest(redisClient, user.id);
    await checkResetRequestCount(redisClient, user.id);

    const token = randomstring.generate({ length: 6, charset: 'numeric' });
    await redisClient.setex(hashString(token, env.PASSWORD_RESET_SECRET), 900, encrypt(email));

    logger.info(`${user.id} has generated a password reset token`);

    return { token };
  };

async function checkBannedRequest(redisClient: Redis, userId: string) {
  const key = `${UsersConstants.BAN_PASSWORD_PREFIX}:${hashString(userId, env.PASSWORD_RESET_SECRET)}`;
  const isBanned = await redisClient.exists(key);
  if (isBanned >= 1) throw new AppError('FORBIDDEN', 'Email is currently banned from making this request.');
}

async function checkResetRequestCount(redisClient: Redis, userId: string) {
  const key = `${UsersConstants.RESET_PASSWORD_COUNT_PREFIX}:${hashString(userId, env.PASSWORD_RESET_SECRET)}`;

  const numberOfRequestWithinMinute = Number(await redisClient.get(key));

  logger.info(key);
  logger.info(numberOfRequestWithinMinute);

  // Number(null) converts to zero
  if (numberOfRequestWithinMinute < 1) {
    await redisClient.expire(key, UsersConstants.RESET_PASSWORD_COUNT_TTL);
  } else {
    await redisClient.incr(key);
  }

  if (numberOfRequestWithinMinute >= UsersConstants.MAX_PASSWORD_RESET_REQUEST_PER_MIN) {
    logger.info(`${userId} has made too many reset password request.`);

    if (numberOfRequestWithinMinute >= UsersConstants.MAX_REQUESTS_BEFORE_BAN) await banEmail(redisClient, userId);
    throw new AppError('TOO_MANY_REQUESTS', 'Too many requests. Please try again later.');
  }
}

async function banEmail(redisClient: Redis, userId: string) {
  const key = `password:request:ban:${hashString(userId, env.PASSWORD_RESET_SECRET)}`;
  await redisClient.setex(key, UsersConstants.BAN_PASSWORD_TTL, 'true');

  logger.info(`${userId} banned from making password request.`);

  //? Send a notification or perform other actions when email is banned
}
