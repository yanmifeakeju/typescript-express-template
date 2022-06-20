import { Router } from 'express';

const router = Router();

router.use('/', (_, res) => {
  res.status(200).json({ message: 'Hello, You are calling the users path  API!' });
});

export default router;
