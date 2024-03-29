const code = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_ERROR: 503
} as const;

type ErrorType = keyof typeof code;

export class ApiError extends Error {
  statusCode: number;

  constructor(type: ErrorType, public message: string) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);

    this.statusCode = code[type];

    Error.captureStackTrace(this);
  }
}
