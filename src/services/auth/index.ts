export interface AuthService {
  createAuthToken: () => Promise<unknown>;
  validateAuthToken: () => Promise<unknown>;
  login: () => Promise<unknown>;
  signUp: () => Promise<unknown>;
}
