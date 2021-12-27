import express, { Request, Response } from 'express';
import passport from 'passport';
import { authSchema } from '../models/authenticate';
import { generateAccessToken } from '../services/jwt';
import { validateSchema } from '../utils';

const authRouter = express.Router();

authRouter.post('/login', validateSchema(authSchema), passport.authenticate('local', { session: false }), async (req: Request, res: Response) => {
  const token = generateAccessToken(req.body.username);

  res.json({ token });
});

export default authRouter;
