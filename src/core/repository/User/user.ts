import { PrismaClient } from '@prisma/client';
import { find, findById, save } from './query';

export interface IUserRepository {
  readonly update: (id: string) => Promise<unknown>;
  readonly findById: (id: string) => Promise<unknown>;
  readonly find: () => Promise<unknown>;
  readonly save: () => Promise<unknown>;
}

export const Repository = (db: PrismaClient) => {
  return {
    save: save(db.user),
    findById: findById(db.user),
    find: find(db.user)
  };
};
