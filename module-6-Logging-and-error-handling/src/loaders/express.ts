import express from 'express';
import groupRouter from '../routers/group';
import userRouter from '../routers/user';
import userGroupRouter from '../routers/userGroup';
import { errorHandler, failSafeHandler, logResponseTime } from '../utils';


export default async ({ app }: {app: express.Application}): Promise<express.Application> => {
  // -------------------------
  // app properties
  // -------------------------

  app.set('appName', 'Task 5');

  // -------------------------
  // app settings
  // -------------------------

  app.set('strict routing', true);

  app.set('x-powered-by', false);

  // -------------------------
  // app middlewares
  // -------------------------

  // allow parsing of json body
  app.use(express.json());

  app.use(logResponseTime);

  // -------------------------
  // router level
  // -------------------------

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

