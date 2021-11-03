import express, { Request, Response } from 'express';
import { groupSchema } from '../models/group';
import { addGroup, deleteGroup, getGroup, getGroups, updateGroup } from '../services/group';
import { validateSchema } from '../utils';

const groupRouter = express.Router();

groupRouter.get('/groups', async (req: Request, res: Response) => {
  const groups = await getGroups();

  res.json(groups);
});

groupRouter.get('/groups/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const group = await getGroup(id);

  res.json(group);
});

groupRouter.delete('/groups/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedGroups = await deleteGroup(id);

  res.json(updatedGroups);
});

groupRouter.put('/groups/:id', validateSchema(groupSchema), async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedGroup = await updateGroup(id, req.body);

  res.json(updatedGroup);
});


groupRouter.post('/groups/create', validateSchema(groupSchema), async (req: Request, res: Response) => {
  const newGroups = await addGroup(req.body);

  res.json(newGroups);
});


export default groupRouter;
