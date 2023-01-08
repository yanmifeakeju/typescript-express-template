import { postgresClient } from '../../../infrastructure/postgres/connection';
import { Repository } from './user';

export const UserRepository = Repository(postgresClient);
