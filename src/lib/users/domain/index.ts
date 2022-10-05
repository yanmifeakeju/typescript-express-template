import { create } from '../entities/create';
import { fetchUser, saveUser } from '../query';
import { createUser } from './createUser';

export const register = create(createUser(fetchUser, saveUser));
