import { NextFunction, Request, Response } from 'express';

const handleError = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ success: false, message: 'Payload should be valid JSON format.' });
  }

  return res.status(500).json({ message: 'Bad' });
};

export default handleError;
