import { validator } from '../../../utils/validator';
import { ApiError } from '../../errors/apiError';
import { CreateUserPayload, CreateUserResponse, CreateUserPayloadSchema } from '../schema/schema';

type SaveUserFunc = (args: CreateUserPayload) => Promise<CreateUserResponse>;

export const create = (saveUser: SaveUserFunc) => {
  return async (data: CreateUserPayload) => {
    const { isValid, error } = validator(CreateUserPayloadSchema, data);
    if (!isValid) throw new ApiError('UNPROCESSABLE_ENTITY', error, data);

    return saveUser(data);
  };
};
