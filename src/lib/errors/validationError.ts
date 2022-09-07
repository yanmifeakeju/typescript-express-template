const code = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  SERVICE_ERROR: 503
};

type ErrorType = keyof typeof code;

class ApiError<T> extends Error {
  statusCode: number;
  data: T | undefined;

  constructor(private type: ErrorType, public message: string, private error?: T) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
    this.statusCode = code[type];
    this.data = error ?? undefined;

    Error.captureStackTrace(this);
  }
}

export { ApiError };
