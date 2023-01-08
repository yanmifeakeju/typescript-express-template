import { PrismaClient } from '@prisma/client';
import { find, findById, save, update } from './query';

export interface IUserRepository {
  readonly update: (id: string) => Promise<unknown>;
  readonly findById: (id: string) => Promise<unknown>;
  readonly find: () => Promise<unknown>;
  readonly save: () => Promise<unknown>;
}

export const Repository = (db: PrismaClient) => {
  return {
    save: save(db),
    findById: findById(db),
    find: find(db),
    update: update(db)
  };
};
