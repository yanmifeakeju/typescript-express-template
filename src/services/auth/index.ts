import { CreateUserParams } from '../../core/users/types';

export interface IAuthService {
  login(): Promise<{ session: { token: string } }>;
  signUp(data: CreateUserParams): Promise<{ session: { token: string } }>;
  authenticatedUserProfile(userId: string): Promise<unknown>;
}

export const AuthService: IAuthService = {
  async login() {
    return { session: { token: 'string' } };
  },

  async signUp({ email, firstName, lastName, password, bio }) {
    return { session: { token: 'string' } };
  },

  async authenticatedUserProfile(userId: string) {
    return { hello: 'string' };
  }
};
