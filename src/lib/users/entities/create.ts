import { validator } from '../../../utils/validator';
import { ApiError } from '../../errors/apiError';
import { CreateUserPayload, CreateUserResponse, CreateUserPayloadSchema } from '../schema/schema';

type SaveUserFunc = (args: CreateUserPayload) => Promise<CreateUserResponse>;

export function create(saveUser: SaveUserFunc) {
  return (data: CreateUserPayload) => {
    const { isValid, error } = validator(CreateUserPayloadSchema, data);
    if (!isValid) throw new ApiError('BAD_REQUEST', error, data);

    return saveUser(data);
  };
}
