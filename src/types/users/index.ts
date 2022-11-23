import { Static } from '@sinclair/typebox';
import { CreateUserPayloadSchema, CreateUserResponseSchema, UserSchema } from '../../lib/users/schema/schema';

export type User = Static<typeof UserSchema>;
export type CreateUserResponse = Static<typeof CreateUserResponseSchema>;
export type CreateUserPayload = Static<typeof CreateUserPayloadSchema>;
export type SaveUser = (args: CreateUserPayload) => Promise<CreateUserResponse | never>;
