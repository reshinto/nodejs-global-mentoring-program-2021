import { Schema, Context } from 'joi';
import { Request, Response, NextFunction } from 'express';
import logger from './config/logger';

type schemaErrorsType = {
  message: string;
  path: (string | number)[];
  type: string;
  context?: Context
}

type errorResponseType = {
  status: string;
  errors: { path: (string | number)[]; message: string }[];
}

export const errorResponse = (schemaErrors: schemaErrorsType[], err: Error): errorResponseType => {
  const errors = schemaErrors.map(({ path, message }: { path: (string | number)[], message: string }) => ({ path, message }));
  logError(err, errors);
  return {
    status: 'failed',
    errors
  };
};

export const validateSchema = (schema: Schema) => (req: Request, res: Response, next: NextFunction): Response | undefined => {
  const { error } = schema.validate(req.body, {
    abortEarly: true,
    allowUnknown: false
  });

  if (error && error.isJoi) {
    const err: Error = new Error();
    return res.status(400).json(errorResponse(error.details, err));
  }

  next();
};

export const setMinAndMaxLength = (min: number, max: number | string = ''): string => `.{${min},${max}}`;

export const setRegex = (min?: number, max?: number, ...args: string[]): RegExp => {
  let regex = '';
  for (const arg of args) {
    regex += arg;
  }
  if (min) {
    regex += max ? setMinAndMaxLength(min, max) : setMinAndMaxLength(min, '');
  }
  return new RegExp(`^${regex}$`);
};

export interface Error {
  status?: number;
  type?: string;
  message?: string;
  stack?: string
}

export function inspect(e: Error): string[][] {
  const frame: string[] = e.stack?.split('\n') || [];
  const newFrame = [];
  for (const str of frame) {
    newFrame.push(str.split(' '));
  }
  return newFrame;
}

// Catch 404 and forward to error handler
export function failSafeHandler(req: Request, res: Response, next: NextFunction): void { // generic handler
  const err: Error = new Error('Not Found');
  err.status = 500;
  next(err);
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): Response { // generic handler
  const message = err.message || 'Something went wrong';
  logError(err, message);
  return res.status(err.status || 500).json({
    error: [{
      message
    }]
  });
}

export function logError(err: Error, message: unknown, ...args: unknown[]): void {
  const funcDetails = inspect(err);
  if (args.length) {
    logger.error(message, { method: funcDetails[1][5], args });
  } else {
    logger.error(message, { method: funcDetails[1][5] });
  }
}

export function handleUnhandledRejection(reason: unknown, promise: unknown): void {
  const err: Error = new Error();
  logError(err, 'Unhandled Rejection', reason, promise);
}

export function handleUncaughtException(err: Error): void {
  logError(err, 'Uncaught Exception', err);
  process.exit(1);
}

export function logResponseTime(req: Request, res: Response, next: NextFunction): void {
  const startHrTime = process.hrtime();

  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    console.log('%s : %fms', req.path, elapsedTimeInMs);
  });

  next();
}

export function customError(res: Response, errorMessage: string, statusCode: number): void {
  const err: Error = new Error();
  logError(err, errorMessage);
  err.message = errorMessage;
  res.status(statusCode).json({
    status: 'failed',
    errors: [{ message:err.message }]
  });
}
