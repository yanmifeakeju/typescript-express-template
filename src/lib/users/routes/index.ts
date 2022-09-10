import express from 'express';
import { registerNewUser } from '../handlers/register';

export const defineUsersRoutes = (app: express.Router) => {
  app.post('/', registerNewUser);
  app.get('/', (req, res) => res.send('Hello'));

  return app;
};
