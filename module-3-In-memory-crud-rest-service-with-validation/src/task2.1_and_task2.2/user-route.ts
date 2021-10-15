import express, { Request, Response } from 'express';
import {
  addToUsersDb,
  getNonDeletedUser,
  getNonDeletedUsers,
  updateUserInDb,
  softDeleteUserInDb,
  getAutoSuggestUsers
} from './user-model';
import { userSchema } from './user-schema';
import { validateSchema } from './utils';


const userRouter = express.Router();

userRouter.get('/users', (req: Request, res: Response) => {
  const users = getNonDeletedUsers();

  res.json(users);
});

userRouter.get('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const user = getNonDeletedUser(id);

  res.json(user);
});

userRouter.delete('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedUsers = softDeleteUserInDb(id);

  res.json(updatedUsers);
});

userRouter.put('/users/:id', validateSchema(userSchema), (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedUser = updateUserInDb(id, req.body);

  res.json(updatedUser);
});


userRouter.post('/users/create', validateSchema(userSchema), (req: Request, res: Response) => {
  const newUsers = addToUsersDb(req.body);

  res.json(newUsers);
});

userRouter.get('/users/search/:login', (req: Request, res: Response) => {
  const { login: loginSubString } = req.params;
  const { order = 'asc', limit = '10' } = req.query;
  const suggestedUsers = getAutoSuggestUsers(loginSubString, limit as string);
  if (order === 'desc') {
    suggestedUsers.reverse();
  }
  res.json(suggestedUsers);
});

export default userRouter;
