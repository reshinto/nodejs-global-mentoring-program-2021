import express, { Request, Response } from 'express';
import {
  addUser,
  getSuggestedUsers,
  getUser,
  getUsers,
  softDeleteUser,
  updateUser
} from '../services/user';
import { userSchema } from '../models/user';
import { validateSchema } from '../utils';
import { checkJwtToken } from '../services/jwt';

const userRouter = express.Router();

userRouter.get('/users', checkJwtToken, async (req: Request, res: Response) => {
  const users = await getUsers();

  res.json(users);
});

userRouter.get('/users/:id', checkJwtToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUser(id);

  res.json(user);
});

userRouter.delete('/users/:id', checkJwtToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedUsers = await softDeleteUser(id);

  res.json(updatedUsers);
});

userRouter.put('/users/:id', checkJwtToken, validateSchema(userSchema), async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedUser = await updateUser(id, req.body);

  res.json(updatedUser);
});


userRouter.post('/users/create', checkJwtToken, validateSchema(userSchema), async (req: Request, res: Response) => {
  const newUsers = await addUser(req.body);

  res.json(newUsers);
});

userRouter.get('/users/search/:login', checkJwtToken, async (req: Request, res: Response) => {
  const { login: loginSubString } = req.params;
  const { order = 'asc', limit = '10' } = req.query;

  const suggestedUsers = await getSuggestedUsers(loginSubString, limit as string, order as string);
  res.json(suggestedUsers);
});

export default userRouter;
