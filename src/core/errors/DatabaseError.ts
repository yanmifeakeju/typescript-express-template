import logger from '../../lib/utils/logger';

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DatabaseError.prototype);

    Error.captureStackTrace(this);
  }
}

export const createDatabaseError = (err: Error, message: string) => {
  logger.error(err);
  return new DatabaseError(message);
};
