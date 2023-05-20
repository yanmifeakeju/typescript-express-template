import { DB, postgresClient } from '../../../infrastructure/postgres/connection';
import { DatabaseError } from '../../../shared/errors/DatabaseError';
import { CreateUserParams, UpdateUserParam, UserProfile } from '../schema';
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

const selectUserById = (db: DB) => async (id: string) => {
  const user = await db.user.findUnique({ where: { id } });
  if (!user) return null;

  return {
    id: user.id,
    bio: user.bio,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    password: user.password
  };
};

const selectUserByEmail = (db: DB) => async (email: string) => {
  if (!email) throw new TypeError('Email is undefined');
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) return null;

    return {
      id: user.id,
      bio: user.bio,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      password: user.password
    };
  } catch (error) {
    throw new DatabaseError(`Error fetching user with email`, error);
  }
};

const updateUser = (db: DB) => async (userId: string, userData: UpdateUserParam) => {
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        ...(userData.bio && { bio: userData.bio }),
        ...(userData.email && { email: userData.email }),
        ...(userData.password && { password: userData.password }),
        ...(userData.firstName && { first_name: userData.firstName }),
        ...(userData.lastName && { last_name: userData.lastName })
      }
    });
    return {
      id: updatedUser.id,
      bio: updatedUser.bio,
      email: updatedUser.email,
      firstName: updatedUser.first_name,
      lastName: updatedUser.last_name,
      password: updatedUser.password
    };
  } catch (error) {
    throw new DatabaseError(`Error updating user.`, error);
  }
};

export const UserRepository: IUserRepository = {
  insertUser: insertUser(postgresClient),
  selectUserById: selectUserById(postgresClient),
  selectUserByEmail: selectUserByEmail(postgresClient),
  updateUser: updateUser(postgresClient)
};
