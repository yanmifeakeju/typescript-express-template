import { Router } from 'express';
import { postgresClient } from '../../../infrastructure/database/postgres/connection';

const router = Router();

router.use('/', async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.first_name || !req.body.last_name || !req.body.password) {
      res.status(400).json({
        success: false,
        message: 'Payload must contain at least the email and password fields'
      });
      return;
    }

    if (
      typeof req.body.email !== 'string' ||
      typeof req.body.first_name !== 'string' ||
      typeof req.body.last_name !== 'string' ||
      typeof req.body.password !== 'string'
    ) {
      res.status(400).json({
        success: false,
        message: 'The email and password fields must be of type string'
      });
      return;
    }

    await postgresClient.user.create({ data: req.body });
    res.status(201).json({ success: true, message: 'Welcome to the API' });
  } catch (error) {
    next(error);
  }
});

export default router;
