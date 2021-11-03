import express, { Request, Response } from 'express';
import { userGroupSchema } from '../models/userGroup';
import { validateSchema } from '../utils';
import { addUsersToGroup, getUserGroup } from '../services/userGroup';

const userGroupRouter = express.Router();

userGroupRouter.get('/usergroup', async (req: Request, res: Response) => {
  const userGroup  = await getUserGroup();

  res.json(userGroup);
});

userGroupRouter.post('/usergroup/addusers', validateSchema(userGroupSchema), async (req: Request, res: Response) => {
  const { groupId, userIds } = req.body;
  const userGroup = await addUsersToGroup(groupId, userIds);

  res.json(userGroup);
});

export default userGroupRouter;
