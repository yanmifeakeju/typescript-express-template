import { RequireAtLeastOne } from '../../../shared/types';
import { CreateUserParams, UpdateUserParam, User, UserProfile } from '../schema';

export type IUserRepository = {
  readonly insertUser: (params: CreateUserParams) => Promise<UserProfile>;
  readonly selectUserById: (id: string) => Promise<User | null>;
  readonly selectUserByEmail: (email: string) => Promise<User | null>;
  readonly updateUser: (id: string, userProps: RequireAtLeastOne<UpdateUserParam>) => Promise<User>;
};
