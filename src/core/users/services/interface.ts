export type IUserService = {
  readonly create: (params: { name: string }) => Promise<{ name: string }>;
  readonly findById: (id: string) => Promise<unknown>;
  readonly validateAuthCreds: (email: string, password: string) => Promise<unknown>;
  readonly initiatePasswordReset: (email: string) => Promise<unknown>;
  readonly completePasswordReset: (email: string) => Promise<unknown>;
  readonly changePassword: (id: string, userProps: unknown) => Promise<unknown>;
};
