import { NextFunction, Request, Response } from 'express';
import { register } from '../domain';
import { CreateUserPayload, CreateUserResponse } from '../schema/schema';

type createUserFunc = (args: CreateUserPayload) => Promise<CreateUserResponse>;

const createNewUserHandler = (handler: createUserFunc) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await handler(req.body);
    return res.status(201).json({ success: true, message: 'User created successfully.', data: { profile: user } });
  } catch (error) {
    next(error);
  }
};

export const createUser = createNewUserHandler(register);
