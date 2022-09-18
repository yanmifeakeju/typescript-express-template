import { Prisma, User } from '@prisma/client';
import { hashPaswword } from '../../../utils/auth';
import { ApiError } from '../../errors/apiError';
import { CreateUserPayload, CreateUserResponse } from '../schema/schema';

type SaveUserRecordFunc = (args: Prisma.UserCreateInput) => Promise<User>;
type FindUserRecordFunc = (args: Prisma.UserWhereInput) => Promise<User | null>;

export const createUser =
  (findUserRecord: FindUserRecordFunc, saveUserRecord: SaveUserRecordFunc) =>
  async (data: CreateUserPayload): Promise<CreateUserResponse> => {
    const userExist = await findUserRecord({ email: data.email });
    if (userExist) throw new ApiError('CONFLICT', 'An account with email already exists', data);

    const user = await saveUserRecord({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: await hashPaswword(data.password)
    });

    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      bio: user.bio
    };
  };
