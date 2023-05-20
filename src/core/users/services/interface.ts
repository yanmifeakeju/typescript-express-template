import { RequireAtLeastOne } from '../../../shared/types';
import { CreateUserParams, UserProfile } from '../schema';

export type IUserService = {
  readonly createProfile: (data: CreateUserParams) => Promise<UserProfile>;
  readonly findProfile: ({
    email,
    userId
  }: RequireAtLeastOne<{ email?: string; userId?: string }>) => Promise<UserProfile>;
  readonly validateAuthCreds: (email: string, password: string) => Promise<UserProfile>;
  readonly initiatePasswordReset: (email: string) => Promise<{ token: string }>;
  //   readonly completePasswordReset: (email: string) => Promise<unknown>;
  //   readonly changePassword: (id: string, userProps: unknown) => Promise<unknown>;
};
