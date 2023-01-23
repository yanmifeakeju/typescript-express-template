import { Redis } from 'ioredis';
import config from '../../config/config';

const redis = new Redis(config.REDIS_URL, { lazyConnect: true });

export { redis };
