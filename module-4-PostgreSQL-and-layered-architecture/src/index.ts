/*
The task is a continuation of Homework2 and should be done in the same repo.
Task 3.1:
- Install DB PostgreSQL on your machine or use a free web hosting services for PostgreSQL (https://www.heroku.com/postgresor https://www.elephantsql.com/plans.html).
- Write SQL script which will create Users table in the DB and fill it in with predefined users’ collection.
- Configure your REST service to work with PostgreSQL.
  − Use the sequelize package (http://docs.sequelizejs.com/) as ORM to work with PostgreSQL.
  - As an alternative to sequelize you can use more low-level query-builder library (http://knexjs.org/).

Task 3.2:
- The service should adhere to 3-layer architecture principles (https://softwareontheroad.com/ideal-nodejs-project-structure/) and contain the following set of directories:
  |-routers / controllers
  |-services
  |-data-access
  |-models
*/

/* eslint-disable no-unused-vars */
import express from 'express';
import loaders from './loaders';

async function startServer(): Promise<void> {
  const app = express();
  const PORT = 3000;

  await loaders({ expressApp: app });

  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
}

startServer();
