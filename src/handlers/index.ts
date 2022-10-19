import { register } from '../lib/users/domain';
import { registerUser } from './auth';

export const authHandlers = {
  register: registerUser(register)
};
