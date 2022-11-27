import { Type } from '@sinclair/typebox';
import { Nullable } from '../../../lib/schema';

export const UserSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),
    firstName: Type.String({ minLength: 1 }),
    lastName: Type.String({ minLength: 1 }),
    bio: Type.Optional(Nullable(Type.String({ minLength: 100 }))),
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 8 })
  },
  { additionalProperties: false }
);

export const CreateUserParamSchema = Type.Omit(UserSchema, ['id']);
export const UserProfileSchema = Type.Omit(UserSchema, ['password']);
export const EmailAndPasswordSchema = Type.Pick(UserSchema, ['email', 'password']);
