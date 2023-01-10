import { NextFunction, Request, Response } from 'express';
import { mapServiceErrorToApiError } from '../../shared/errors/mapper';

export const errorHandler = (error: Error, req: Request, res: Response, _next: NextFunction) => {
  const apiError = mapServiceErrorToApiError(error);

  return res.status(apiError.statusCode).json({ success: false, message: apiError.message });
};
