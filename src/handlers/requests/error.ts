import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../lib/shared/errors/ApiError';

export const errorHandler = (errorMapper: (err: Error) => ApiError) => {
  return (error: Error, req: Request, res: Response, _next: NextFunction) => {
    const apiError = errorMapper(error);

    return res.status(apiError.statusCode).json({ success: false, message: apiError.message });
  };
};
