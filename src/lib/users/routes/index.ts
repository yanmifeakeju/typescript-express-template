import express from 'express';
import { createUser } from '../handlers/register';

export const defineUsersRoutes = (app: express.Router) => {
  app.post('/', createUser);
  app.get('/', (req, res) => res.send('Hello'));

  return app;
};
