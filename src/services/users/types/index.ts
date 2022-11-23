import { Static } from '@sinclair/typebox';
import { CreateUserParamSchema, UserProfileSchema } from '../schema';

export type CreateUserParams = Static<typeof CreateUserParamSchema>;
export type UserProfile = Static<typeof UserProfileSchema>;
