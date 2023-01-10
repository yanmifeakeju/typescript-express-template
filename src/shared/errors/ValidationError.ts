export class ValidationError extends Error {
  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, ValidationError.prototype);
    Error.captureStackTrace(this);
  }
}
