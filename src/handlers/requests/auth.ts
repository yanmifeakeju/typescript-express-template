import asyncHandler from '../../api/middlewares/asyncHandler';
import { signUpUser } from '../../services/auth/signUp';

export const registerUser = asyncHandler(async (req, res, _next) => {
  const response = await signUpUser(req.body);
  return res.status(201).json({ success: true, message: 'Successfully register user', data: response });
});
