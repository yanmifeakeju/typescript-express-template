import { PrismaClient } from '@prisma/client';

const postgresClient = new PrismaClient();

export { postgresClient };
