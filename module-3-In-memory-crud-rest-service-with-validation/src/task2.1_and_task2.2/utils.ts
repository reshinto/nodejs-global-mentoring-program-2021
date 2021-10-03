import { Schema, Context } from 'joi';
import { Request, Response, NextFunction } from 'express';

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

export const errorResponse = (schemaErrors: schemaErrorsType[]): errorResponseType => {
  const errors = schemaErrors.map(({ path, message }: { path: (string | number)[], message: string }) => ({ path, message }));

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
    console.log(errorResponse(error.details));
    return res.status(400).json(errorResponse(error.details));
  }

  next();
};

export const setMinAndMaxLength = (min: number, max: number | string = ''): string => `.{${min},${max}}`;

export const setRegex = (min: number, max?: number, ...args: string[]): RegExp => {
  let regex = '';
  for (const arg of args) {
    regex += arg;
  }
  regex += max ? setMinAndMaxLength(min, max) : setMinAndMaxLength(min, '');
  return new RegExp(`^${regex}$`);
};
