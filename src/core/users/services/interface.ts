import { CreateUserParams, UserProfile } from '../schema';

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type IUserService = {
  readonly createProfile: (data: CreateUserParams) => Promise<UserProfile>;
  readonly findProfile: ({
    email,
    userId
  }: RequireAtLeastOne<{ email?: string; userId?: string }>) => Promise<UserProfile>;
  //   readonly validateAuthCreds: (email: string, password: string) => Promise<UserProfile>;
  //   readonly initiatePasswordReset: (email: string) => Promise<unknown>;
  //   readonly completePasswordReset: (email: string) => Promise<unknown>;
  //   readonly changePassword: (id: string, userProps: unknown) => Promise<unknown>;
};
