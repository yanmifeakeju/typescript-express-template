import express from 'express';
import { registerUser } from '../../handlers/requests/auth/auth';

export const authRoutes = (router: express.Router) => {
  router.post('/register', registerUser);

  return router;
};
