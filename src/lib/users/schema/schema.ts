import { Type, Static, TSchema } from '@sinclair/typebox';

function Nullable<T extends TSchema>(schema: T) {
  return Type.Unsafe<Static<T> | null>({ ...schema, nullable: true });
}

export const UserSchema = Type.Object({
  id: Type.String(),
  firstName: Type.String(),
  lastName: Type.String(),
  bio: Type.Optional(Nullable(Type.String())),
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 8 })
});

export const RegisterUserPayloadSchema = Type.Omit(UserSchema, ['id']);
export type RegisterUserPayload = Static<typeof RegisterUserPayloadSchema>;
export const RegisterUserResponseSchema = Type.Omit(UserSchema, ['password']);
export type RegisterUserResponse = Static<typeof RegisterUserResponseSchema>;
