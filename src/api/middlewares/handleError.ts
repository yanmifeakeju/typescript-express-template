import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../lib/errors/apiError';

const handleError = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  let message = 'bad';
  let statusCode = 500;
  let data: unknown;

  if (err instanceof SyntaxError && 'body' in err) {
    statusCode = 400;
    message = 'Payload should be valid JSON format.';
  }

  if (err instanceof ApiError) {
    (statusCode = err.statusCode), (message = err.message), (data = err.data);
  }

  return res.status(statusCode).json({ success: false, message, data });
};

export default handleError;
