import { Type, Static, TSchema } from '@sinclair/typebox';

function Nullable<T extends TSchema>(schema: T) {
  return Type.Unsafe<Static<T> | null>({ ...schema, nullable: true });
}

export const UserSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  firstName: Type.String({ minLength: 1 }),
  lastName: Type.String({ minLength: 1 }),
  bio: Type.Optional(Nullable(Type.String({ minLength: 100 }))),
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 8 })
});

export const CreateUserPayloadSchema = Type.Omit(UserSchema, ['id']);
export const CreateUserResponseSchema = Type.Omit(UserSchema, ['password']);

export type User = Static<typeof UserSchema>;
export type CreateUserResponse = Static<typeof CreateUserResponseSchema>;
export type CreateUserPayload = Static<typeof CreateUserPayloadSchema>;
