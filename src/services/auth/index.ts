export interface IAuthService {
  login(): Promise<{ session: { token: string } }>;
  signUp(): Promise<{ session: { token: string } }>;
  authenticatedUserProfile(userId: string): Promise<unknown>;
}

export const AuthService: IAuthService = {
  async login() {
    return { session: { token: 'string' } };
  },

  async signUp() {
    return { session: { token: 'string' } };
  },

  async authenticatedUserProfile(userId: string) {
    return { hello: 'string' };
  }
};
