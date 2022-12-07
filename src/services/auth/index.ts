export interface AuthService {
  login: () => Promise<unknown>;
  signUp: () => Promise<unknown>;
}
