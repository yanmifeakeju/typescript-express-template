import express from 'express';
import { login, register } from '../../handlers/requests/auth/auth';

export const authRoutes = (router: express.Router) => {
  router.post('/sign-up', register);
  router.post('/sign-in', login);

  return router;
};
