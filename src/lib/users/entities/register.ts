import { validator } from '../../../utils/validator';
import { ApiError } from '../../errors/apiError';
import { RegisterUserPayload, RegisterUserResponse, RegisterUserPayloadSchema } from '../schema/schema';

type SaveUserFunc = (args: RegisterUserPayload) => Promise<RegisterUserResponse>;

export function registerUser(saveUser: SaveUserFunc) {
  return (data: RegisterUserPayload) => {
    const { isValid, errors } = validator(RegisterUserPayloadSchema, data);
    if (!isValid) throw new ApiError('BAD_REQUEST', 'Validation Failed', errors);

    return saveUser(data);
  };
}
