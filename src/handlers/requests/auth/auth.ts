import asyncHandler from '../../../api/middlewares/asyncHandler';
import { signUpUser } from '../../../services/auth/signUp';
import { generateAuthenticationToken } from '../../../services/auth/token';

export const registerUser = asyncHandler(async (req, res, _next) => {
  const { data, error } = await signUpUser(req.body);
  if (error) return res.status(400).json({ success: false, message: error.message });

  const token = generateAuthenticationToken(data.userId);
  return res.status(201).json({ success: true, message: 'Successfully register user', data: token.data.token });
});
