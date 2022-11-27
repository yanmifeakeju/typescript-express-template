import { Type } from '@sinclair/typebox';

export const CreateAuthTokenSchema = Type.Object({
  userId: Type.String({ format: 'uuid' })
});

export const ValidateAuthToken = Type.Object({
  token: Type.String()
});
