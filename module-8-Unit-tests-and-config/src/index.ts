/*
The task is a continuation of Homework 6 and should be done in the same repo.

TASK 7.1
- Add unit tests for User entity controller methods using Jest library (https://jestjs.io/).
- Add unit tests for Group entity controller methods using Jest.

TASK 7.2
- The information on DB connection (connection string) should be stored in.env file
  and should be passed to the application using environment variables with the help of dotenv package
  (https://www.npmjs.com/package/dotenv).

  As an alternative package you can also use config (https://www.npmjs.com/package/config).
*/

/* eslint-disable no-unused-vars */
import express from 'express';
import expressLoader from './loaders/express';
import loaders from './loaders';
import { handleUncaughtException, handleUnhandledRejection } from './utils';

const PORT = 3000;

export function startServer(): express.Application {
  const app = express();

  expressLoader({ app });

  process
    .on('unhandledRejection', handleUnhandledRejection)
    .on('uncaughtException', handleUncaughtException);

  return app;
}

const app = startServer();

const server = app.listen(PORT, async () => {
  await loaders();
  console.log(`Server is listening on port ${PORT}`);
});

export default server;
