import { PrismaClient } from '@prisma/client';

export type GetClient = () => PrismaClient;

const postgresClient = new PrismaClient();

export { postgresClient };

export const getClient: GetClient = () => {
  return postgresClient;
};
