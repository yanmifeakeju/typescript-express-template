import { UserError } from '../../core/errors/UserError';
import { ValidationError } from '../../shared/errors/ValidationError';

export const handleError = (error: Error) => {
  if (error instanceof ValidationError || error instanceof UserError) {
    return { error: new Error(error.message), data: null };
  }
  throw error;
};
