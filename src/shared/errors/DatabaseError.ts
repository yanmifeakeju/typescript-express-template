import { Prisma } from '@prisma/client';
import logger from '../logger';
import env from '../../config/env';

export class DatabaseError extends Error {
  constructor(message: string, e: unknown) {
    super(message);
    ReportPrismaError(e as Error);
    Object.setPrototypeOf(this, DatabaseError.prototype);

    Error.captureStackTrace(this);
  }
}

function ReportPrismaError(e: Error): void {
  if (env.NODE_ENV === 'development') logger.error(JSON.stringify(e, null, 2));

  if (e instanceof Prisma.PrismaClientInitializationError) {
    logger.error(`Database initialization failed: ${e.message}`);
    return;
  }

  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    const { name, code, message } = e;
    const meta = e.meta as { target?: string[] };

    logger.error(
      `Database Error: name: ${name} | message: ${message} | code: ${code} | field: ${
        meta.target ? meta.target.join('|') : 'unknown field'
      }`
    );

    return;
  }

  if (e instanceof Prisma.PrismaClientUnknownRequestError) {
    const { name, message } = e;

    logger.error(`Database Error: name: ${name} | message: ${message} }`);
    return;
  }

  if (e instanceof Prisma.PrismaClientValidationError) {
    const { name, message } = e;

    logger.error(`Database Error: name: ${name} | message: ${message} }`);
    return;
  }

  logger.error(`Unknown DatabaseError ${e.message}`);
}
