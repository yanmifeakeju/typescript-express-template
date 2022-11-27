import { Prisma } from '@prisma/client';
import { postgresClient } from '../infrastructure/postgres/connection';
const db = postgresClient.user;

export const createRecord = (data: Prisma.UserCreateInput) => db.create({ data });

export const fetchRecord = (whereInput: Prisma.UserWhereInput, selectInput?: Prisma.UserSelect) =>
  db.findFirst({ where: { ...whereInput }, ...(selectInput && { select: selectInput }) });
