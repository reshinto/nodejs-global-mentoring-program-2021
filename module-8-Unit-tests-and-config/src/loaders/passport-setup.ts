import passport from 'passport';
import { Strategy as LocalStrategy }  from 'passport-local';
import { UserAttributes } from '../models/user';
import { checkUser } from '../services/user';
import { Error, logError } from '../utils';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback, StrategyOptions } from 'passport-jwt';
import config from '../config';

function useLocalStrategy(): void {
  passport.use(new LocalStrategy(async (username: string, password: string, done: VerifiedCallback) => {
    try {
      const user = await checkUser({ username, password }) as UserAttributes[];
      if (user.length === 1 && user[0].login === username && user[0].password === password) {
        done(null, user[0]);
      } else {
        const err: Error = new Error('Invalid username or password');
        err.status = 400;
        done(err);
      }
    } catch (error) {
      const err = new Error();
      logError(err, error);
      done(error);
    }
  }));
}

function useJwtStrategy(): void {
  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.tokenSecret
  };
  passport.use(new JwtStrategy(opts, async (jwtPayload: { username: string; }, done: VerifiedCallback) => {
    try {
      done(null, jwtPayload.username);
    } catch (error) {
      const err = new Error();
      logError(err, error);
      done(error);
    }
  }));
}

async function setupPassport(): Promise<void> {
  useLocalStrategy();
  useJwtStrategy();
}

export default setupPassport;
