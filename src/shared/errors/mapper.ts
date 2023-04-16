import { AppError } from './AppError';
import { ApiError } from './ApiError';
import { ValidationError } from './ValidationError';

const mapUserServiceErrorToApiError = (err: AppError) => {
  switch (err.errorType) {
    case 'DUPLICATE_ENTRY':
      return new ApiError('CONFLICT', err.message);
    case 'ILLEGAL_ARGUMENT':
      return new ApiError('UNPROCESSABLE_ENTITY', err.message);
    case 'INVALID_ARGUMENT':
      return new ApiError('BAD_REQUEST', err.message);
    default:
      return new ApiError('SERVICE_ERROR', 'An unexpected error occurred on the server.');
  }
};

export const mapServiceErrorToApiError = (err: Error) => {
  if (err instanceof AppError) return mapUserServiceErrorToApiError(err);
  if (err instanceof ValidationError) return new ApiError('BAD_REQUEST', err.message);

  return new ApiError('SERVICE_ERROR', 'An unexpected error occurred on the server');
};
