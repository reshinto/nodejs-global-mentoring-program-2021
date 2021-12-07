import jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import config from '../config';
import passport from 'passport';
import { Error, logError } from '../utils';

export const generateAccessToken = (username: string): string => (
  jwt.sign({ username }, config.tokenSecret, { expiresIn: '1800s' })
);

export async function checkJwtToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  passport.authenticate(
    'jwt',
    async (err, user, info) => {
      try {
        if (err || !user) {
          const errorMsg = info.stack.split('\n')[0];
          const error: Error = new Error(errorMsg);

          if (errorMsg.includes('No auth token')) {
            error.status = 401;
          } else {
            error.status = 403;
          }

          return next(error);
        }
        return next();
      } catch (error) {
        const _err = new Error();
        logError(_err, error);
        return next(error);
      }
    }
  )(req, res, next);
}
