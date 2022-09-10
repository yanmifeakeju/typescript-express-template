import { Router } from 'express';
import { defineUsersRoutes } from '../../lib/users/routes';

const router = defineUsersRoutes(Router());

export default router;
