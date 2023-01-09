import { UserErrorType, UserError } from '../../../core/users/lib/UserError';
import { ApiError } from './ApiError';
import { ValidationError } from './ValidationError';

const mapUserServiceErrorToApiError = (err: UserError) => {
  switch (err.errorType) {
    case UserErrorType.DUPLICATE_ENTRY:
      return new ApiError('CONFLICT', err.message);
    case UserErrorType.ILLEGAL_ARGUMENT:
      return new ApiError('UNPROCESSABLE_ENTITY', err.message);
    case UserErrorType.INVALID_ARGUMENT:
      return new ApiError('BAD_REQUEST', err.message);
    default:
      return new ApiError('SERVICE_ERROR', 'An unexpected error occurred on the server.');
  }
};

export const mapServiceErrorToApiError = (err: Error) => {
  if (err instanceof UserError) return mapUserServiceErrorToApiError(err);
  if (err instanceof ValidationError) return new ApiError('BAD_REQUEST', err.message);

  return new ApiError('SERVICE_ERROR', 'An unexpected error occurred on the server');
};
