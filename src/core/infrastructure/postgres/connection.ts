import { PrismaClient } from '@prisma/client';

export type GetClient = () => PrismaClient;

const postgresClient = new PrismaClient();

export { postgresClient };
