import { PrismaClient } from '@prisma/client';
import config from '../../config/env';

export type PrismaTransaction = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>;
export type DB = PrismaClient;

export const postgresClient = new PrismaClient({
  errorFormat: config.NODE_ENV === 'production' ? 'minimal' : 'pretty'
});
