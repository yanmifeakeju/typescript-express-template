import asyncHandler from '../../api/middlewares/asyncHandler';
import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../../services/users';

export const registerUser = (userService: IUserService) => {
  return asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const response = await userService.createUser(req.body);
    return res.status(201).json({ success: true, message: 'Successfully register user', data: response });
  });
};
