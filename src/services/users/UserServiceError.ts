export enum UserErrorType {
  INVALID_ARGUMENT = 'INVALID_ARGUMENT',
  ILLEGAL_ARGUMENT = 'INVALID_ARGUMENT',
  DUPLICATE_ENTRY = 'DUPLICATE_ENTRY',
  NOT_FOUND = 'NOT_FOUND'
}

export class UserServiceError extends Error {
  constructor(public errorType: UserErrorType, public message: string) {
    super(message);

    Object.setPrototypeOf(this, UserServiceError.prototype);
    Error.captureStackTrace(this);
  }
}
