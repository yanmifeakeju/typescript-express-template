export type IUserService = {
  readonly createUser: (params: { name: string }) => Promise<{ name: string }>;
  readonly findUser: (id: string) => Promise<unknown>;
  readonly initiateUserPasswordReset: (email: string) => Promise<unknown>;
  readonly completeUserPasswordReset: (email: string) => Promise<unknown>;
  readonly changeUserPassword: (id: string, userProps: unknown) => Promise<unknown>;
};
