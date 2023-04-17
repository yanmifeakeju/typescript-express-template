import { CreateUserParams } from '../../users/schema';
import { UserService } from '../../users/services';

export const registerUser = async (data: CreateUserParams) => UserService.createProfile(data);

export const getUserProfile = (userId: string) => UserService.findProfile({ userId });

export const loginUser = (data: unknown) => {
  throw new Error('Unimplemented.');
};
