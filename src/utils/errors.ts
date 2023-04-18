import { AppError } from '../shared/errors/AppError';
import { ValidationError } from '../shared/errors/ValidationError';

export const handleError = (error: Error) => {
  if (error instanceof ValidationError || error instanceof AppError) {
    return { error: new Error(error.message), data: null };
  }
  throw error;
};
