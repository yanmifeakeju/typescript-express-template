import { Redis } from 'ioredis';
import env from '../../config/env';

const redis = new Redis(env.REDIS_URL, { lazyConnect: true });

export { redis };
