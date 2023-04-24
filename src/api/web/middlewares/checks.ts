// import { NextFunction, Request, Response } from 'express';

// export const checkEmptyPayload = (req: Request, res: Response, next: NextFunction) => {
//   if (['POST', 'PATCH', 'PUT'].includes(req.method) && req.headers['content-length'] === '0')
//     return res.status(400).json({ success: false, message: 'Payload should not be empty' });

//   return next();
// };

// export const checkContentTypeIsSet = (req: Request, res: Response, next: NextFunction) => {
//   if (req.headers['content-length'] && req.headers['content-length'] !== '0' && !req.headers['content-type'])
//     return res.status(400).json({
//       success: false,
//       message: 'The "Content-Type" header must be set for request with a non-empty payload'
//     });

//   return next();
// };

// export const checkContentTypeIsJSON = (req: Request, res: Response, next: NextFunction) => {
//   if (!req.headers['content-type']?.includes('application/json'))
//     return res.status(415).json({
//       success: false,
//       message: 'The "Content-Type" header must always be "application/json"'
//     });

//   return next();
// };
