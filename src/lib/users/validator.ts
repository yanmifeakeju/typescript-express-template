import { IUser } from './user';

export const validateNewUser = (data: IUser) => {
  if (!data.firstName) throw new Error('Please provide a first name');
  if (!data.lastName) throw new Error('Please provie a last name');

  return data;
};
