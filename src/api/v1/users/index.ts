import { Router } from 'express';
import { postgresClient } from '../../../infrastructure/database/postgres/connection';

const router = Router();

router.use('/', async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.first_name || !req.body.last_name || !req.body.password) {
      res.status(400).json({ message: 'Payload must contain at least the email and password fields' });
    }

    await postgresClient.user.create({ data: req.body });
    res.status(200).json({ success: true, message: 'Welcome to the API' });
  } catch (error) {
    next(error);
  }
});

export default router;
