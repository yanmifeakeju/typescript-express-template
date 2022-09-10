import { Prisma } from '@prisma/client';
import { createRecord, fetchRecord } from '../../../repository/users';

export const fetchUser = (input: Prisma.UserWhereInput) => fetchRecord(input);

export const saveUser = (input: Prisma.UserCreateInput) => createRecord(input);
