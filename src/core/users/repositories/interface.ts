import { CreateUserParams, UserProfile } from '../schema';

export type IUserRepository = {
  readonly insertUser: (params: CreateUserParams) => Promise<UserProfile>;
  // readonly selectUserById: (id: string) => Promise<User>;
  // readonly selectUserByEmail: (email: string) => Promise<User>;
  // readonly updateUser: (id: string, userProps: unknown) => Promise<User>;
};
