/*
Task 2.1:
Write a simple REST service with CRUD operations for User entity
- To create REST service,use ExpressJS (https://expressjs.com/)
  - The User should have the following properties (you can use UUID as a user identifier (id)):
    ```
    type User = {
      id: string;
      login: string;
      password: string;
      age: number;
      isDeleted: boolean;
    }
    ```
- Service should have the following CRUD operations for User:
  - get user by id;
  - create and update user;
  - get auto-suggest list from limitusers, sorted by login property and filtered by loginSubstring in the login property:
    - getAutoSuggestUsers(loginSubstring, limit)
  - remove user (soft delete–user gets marked with isDeletedflag, but not removed from the collection)
- Store user’s collection in the service memory (while the service is running)
To test the service CRUD methods,you can use Postman (https://www.getpostman.com/)

Task 2.2:
-Add server-side validation for create/update operations of User entity:
  - all fields are required
  - login validation is required
  - password must contain letters and numbers
  - user’s age must be between 4 and 130
- In case of any property does not meet the validation requirements or the field is absent,
  return 400 (Bad Request) and detailed error message
- For requests validation use special packages like joi
  (https://github.com/hapijs/joi, https://www.npmjs.com/package/express-joi-validation).
*/

/* eslint-disable no-unused-vars */
import express, { Request, Response, Errback } from 'express';
import userRouter from './user-route';

const app = express();
const PORT = 3000;

// -------------------------
// app properties
// -------------------------

app.set('appName', 'Task 2.1');

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

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
