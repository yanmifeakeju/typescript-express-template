import { Router } from 'express';
import userRouter from './users';

const router = Router();

router.use('/users', userRouter);
router.use('/', (_, res) => {
  res.status(200).json({ message: 'Hello, Welcome to the V1 API!' });
});

export default router;
