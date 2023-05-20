import { Redis } from 'ioredis';
import env from '../../config/env';
import logger from '../../shared/logger';

const redis = new Redis(env.REDIS_URL, {
  showFriendlyErrorStack: true
});

redis.once('connect', () => logger.info('Redis Client Connected'));

export { redis };
