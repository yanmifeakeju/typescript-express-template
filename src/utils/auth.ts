import bcrypt, { genSalt } from 'bcryptjs';

export const hashPaswword = async (password: string) => bcrypt.hash(password, await genSalt(10));

export const verifyPassword = (password: string, hashed: string) => bcrypt.compare(password, hashed);
