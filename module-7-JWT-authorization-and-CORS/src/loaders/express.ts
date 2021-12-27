import express from 'express';
import cors from 'cors';
import passport from 'passport';
import authRouter from '../routers/authenticate';
import groupRouter from '../routers/group';
import userRouter from '../routers/user';
import userGroupRouter from '../routers/userGroup';
import { errorHandler, failSafeHandler, logResponseTime } from '../utils';
import corsOptions from '../config/corsOptions';


export default async ({ app }: {app: express.Application}): Promise<express.Application> => {
  // -------------------------
  // app properties
  // -------------------------

  app.set('appName', 'Task 6');

  // -------------------------
  // app settings
  // -------------------------

  app.set('strict routing', true);

  app.set('x-powered-by', false);

  // -------------------------
  // app middlewares
  // -------------------------

  // Enable All CORS Requests
  app.use(cors(corsOptions));

  // allow parsing of json body
  app.use(express.json());

  // initialize passport
  app.use(passport.initialize());
  // app.use(passport.session());

  app.use(logResponseTime);

  // -------------------------
  // router level
  // -------------------------

  app.use(authRouter);
  app.use(userRouter);
  app.use(groupRouter);
  app.use(userGroupRouter);

  // -------------------------
  // error-handling middleware
  // -------------------------

  app.use(failSafeHandler);
  app.use(errorHandler);

  return app;
};

