import { registerUser } from '../entities/register';
import { fetchUser, saveUser } from '../query';
import { createUser } from './registerUser';

const save = createUser(fetchUser, saveUser);
export const register = registerUser(save);
