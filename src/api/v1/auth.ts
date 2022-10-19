import express, { Request, Response } from 'express';
import { authHandlers } from '../../handlers';

export const authRoutes = (router: express.Router) => {
  router.post('/register', authHandlers.register);
  router.get('/', (req: Request, res: Response) => res.send('Hello'));

  return router;
};
