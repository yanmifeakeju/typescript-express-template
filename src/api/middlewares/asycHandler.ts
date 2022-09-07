import { NextFunction, Request, RequestHandler, Response } from 'express';

const asyncHanlder = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHanlder;
