import { NextFunction, Request, Response } from 'express';
import { register } from '../domain';
import { RegisterUserPayload } from '../schema/schema';

type registerUserHanlder = (args: RegisterUserPayload) => Promise<unknown>;

const registerNewUserHandler =
  (handler: registerUserHanlder) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await handler(req.body);

      return res.status(201).json({ success: true, message: 'User created successfully.', data: { profile: user } });
    } catch (error) {
      next(error);
    }
  };

export const registerNewUser = registerNewUserHandler(register);
