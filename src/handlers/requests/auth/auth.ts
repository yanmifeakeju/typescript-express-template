// import asyncHandler from '../../../api/middlewares/asyncHandler';
// import config from '../../../config/env';
// import { loginUser } from '../../../services/auth/login';
// import { registerUser } from '../../../services/auth/register';
// import { generateAuthenticationToken } from '../../../services/auth/token';

// export const register = asyncHandler(async (req, res, _next) => {
//   const { data, error } = await registerUser(req.body);
//   if (error) return res.status(400).json({ success: false, message: error.message });

//   const token = generateAuthenticationToken(data.userId, config.USER_JWT_SECRET);
//   return res.status(201).json({ success: true, message: 'User registered successfully', data: token.data.token });
// });

// export const login = asyncHandler(async (req, res, _next) => {
//   const { data, error } = await loginUser(req.body);
//   if (error) return res.status(400).json({ success: false, message: error.message });

//   const token = generateAuthenticationToken(data.userId, config.USER_JWT_SECRET);
//   return res.status(201).json({ success: true, message: 'User login successfully.', data: token.data.token });
// });
