import { validator } from '../../utils/validator';
import { ApiError } from '../../errors/apiError';
import { CreateUserPayloadSchema } from '../schema/schema';
import { CreateUserPayload, SaveUser } from '../../../types/users';

export const create = (saveUser: SaveUser) => {
  return async (data: CreateUserPayload) => {
    const { isValid, error } = validator(CreateUserPayloadSchema, data);

    // Should user an error class defined for user.
    if (!isValid) throw new ApiError('UNPROCESSABLE_ENTITY', error, data);

    return saveUser(data);
  };
};
