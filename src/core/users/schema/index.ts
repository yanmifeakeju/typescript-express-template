import { Type } from '@sinclair/typebox';
import { Nullable } from '../../../shared/schema';

export const UserSchema = Type.Object(
  {
    id: Type.String({ format: 'uuid' }),
    firstName: Type.String({ minLength: 1 }),
    lastName: Type.String({ minLength: 1 }),
    bio: Nullable(Type.String({ maxLength: 200, minLength: 1 })),
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 8 })
  },
  { additionalProperties: false }
);

export const UpdateUserSchema = Type.Partial(
  Type.Pick(UserSchema, ['firstName', 'lastName', 'email', 'password', 'bio'])
);
export const EmailOrUserIdSchema = Type.Partial(Type.Pick(UserSchema, ['email', 'id']));
export const CreateUserParamSchema = Type.Omit(UserSchema, ['id']);
export const UserProfileSchema = Type.Omit(UserSchema, ['password']);
export const EmailAndPasswordSchema = Type.Pick(UserSchema, ['email', 'password']);
