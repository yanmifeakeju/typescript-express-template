import express, { Request, Response } from 'express';
import { registerUser } from '../../handlers/requests/auth';
import { UserService } from '../../services/users';

export const authRoutes = (router: express.Router) => {
  router.post('/register', registerUser(UserService));
  router.get('/', (req: Request, res: Response) => res.send('Hello'));

  return router;
};
