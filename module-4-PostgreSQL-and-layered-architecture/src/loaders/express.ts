import express, { Request, Response, Errback } from 'express';
import userRouter from '../routers/user';

export default async ({ app }: {app: express.Application}): Promise<express.Application> => {
  // -------------------------
  // app properties
  // -------------------------

  app.set('appName', 'Task 3');

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

  // -------------------------
  // router level
  // -------------------------

  app.use(userRouter);

  // -------------------------
  // error-handling middleware
  // -------------------------

  app.use(() => {
    throw new Error('Oops, error:');
  });

  app.use((err: Errback, req: Request, res: Response) => {
    console.log(err);
    res.status(500).send('Something broke!');
  });

  return app;
};

