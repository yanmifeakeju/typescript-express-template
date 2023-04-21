import { redis } from '../../infrastructure/redis';
import { ICacheService } from './interface';

const set = async (key: string, value: string | number, expirationInMinutes?: number) => {
  if (expirationInMinutes) {
    await redis.setex(key, expirationInMinutes, value);
  }
  await redis.set(key, value);
};

export const Cache: ICacheService = {
  set
};
