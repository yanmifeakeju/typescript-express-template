import express from 'express';
import { registerUser } from '../../handlers/requests/auth';
import { UserService } from '../../components/users';

export const authRoutes = (router: express.Router) => {
  router.post('/register', registerUser(UserService));

  return router;
};
