import logger from '../lib/utils/logger';
import { SaveUser } from '../types/users';
import asyncHandler from '../api/middlewares/asycHandler';
import { NextFunction, Request, Response } from 'express';

export const registerUser = (register: SaveUser) => {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await register(req.body);
      return res.status(201).json({ success: true, message: 'Successfully register user', data: response });
    } catch (err) {
      logger.error(err);
      next(err);
    }
  });
};
