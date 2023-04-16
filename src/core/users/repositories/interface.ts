export type IUserRepository = {
  readonly insertUser: (params: { name: string }) => Promise<{ name: string }>;
  readonly selectUserById: (id: string) => Promise<unknown>;
  readonly selectUserByEmail: (email: string) => Promise<unknown>;
  readonly updateUser: (id: string, userProps: unknown) => Promise<unknown>;
};
