import { Type, Static, TSchema } from '@sinclair/typebox';

function Nullable<T extends TSchema>(schema: T) {
  return Type.Unsafe<Static<T> | null>({ ...schema, nullable: true });
}

export const UserSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  firstName: Type.String(),
  lastName: Type.String(),
  bio: Type.Optional(Nullable(Type.String())),
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 8 })
});

export const RegisterUserPayloadSchema = Type.Omit(UserSchema, ['id']);
export const RegisterUserResponseSchema = Type.Omit(UserSchema, ['password']);

export type User = Static<typeof UserSchema>;
export type RegisterUserResponse = Static<typeof RegisterUserResponseSchema>;
export type RegisterUserPayload = Static<typeof RegisterUserPayloadSchema>;
