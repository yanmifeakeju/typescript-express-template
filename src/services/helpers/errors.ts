import { UserError } from '../../core/users/lib/UserError';
import { ValidationError } from '../../lib/shared/errors/ValidationError';

export const handleError = (error: Error) => {
  if (error instanceof ValidationError || error instanceof UserError) {
    return { error: new Error(error.message), data: null };
  }
  throw error;
};
