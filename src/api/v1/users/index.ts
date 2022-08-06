import { Router } from 'express';

const router = Router();

router.use('/', (req, res, next) => {
  res.status(200).json({ success: true, message: 'Welcome to the API' });
});

export default router;
