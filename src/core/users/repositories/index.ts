import { DB, postgresClient } from '../../../infrastructure/postgres/connection';
import { DatabaseError } from '../../../shared/errors/DatabaseError';
import { CreateUserParams, UserProfile } from '../schema';
import { IUserRepository } from './interface';

const insertUser =
  (db: DB) =>
  async ({ firstName, lastName, email, password, bio }: CreateUserParams): Promise<UserProfile> => {
    try {
      const user = await db.user.create({
        data: {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          bio
        }
      });

      return {
        id: user.id,
        bio: user.bio,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name
      };
    } catch (error) {
      throw new DatabaseError(`Error creating user.`, error);
    }
  };

export const UserRepository: IUserRepository = {
  insertUser: insertUser(postgresClient)
};
