import { PrismaClient } from '@prisma/client';
import config from '../../config/config';

export type PrismaTransaction = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>;
export type DB = PrismaClient | PrismaTransaction;

export const postgresClient = new PrismaClient({
  errorFormat: config.NODE_ENV === 'production' ? 'minimal' : 'pretty'
});
