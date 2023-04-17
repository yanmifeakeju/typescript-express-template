import { CreateUserParams, UserProfile } from '../schema';

export type IUserService = {
  readonly create: (data: CreateUserParams) => Promise<UserProfile>;
  //   readonly findById: (id: string) => Promise<UserProfile>;
  //   readonly validateAuthCreds: (email: string, password: string) => Promise<UserProfile>;
  //   readonly initiatePasswordReset: (email: string) => Promise<unknown>;
  //   readonly completePasswordReset: (email: string) => Promise<unknown>;
  //   readonly changePassword: (id: string, userProps: unknown) => Promise<unknown>;
};
