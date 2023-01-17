import { Static } from '@sinclair/typebox';
import { CreateUserParamSchema, UpdateUserSchema, UserProfileSchema } from '../schema';

export type CreateUserParams = Static<typeof CreateUserParamSchema>;
export type UpdateUserParam = Static<typeof UpdateUserSchema>;
export type UserProfile = Static<typeof UserProfileSchema>;
