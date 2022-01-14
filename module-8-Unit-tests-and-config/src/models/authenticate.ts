import Joi from 'joi';
import { ONE_DIGIT, ONE_LOWERCASE, ONE_UPPERCASE } from '../constants';
import { setRegex } from '../utils';

export const authSchema = Joi
  .object()
  .keys({
    username: Joi.string().alphanum().min(3).required(),
    password: Joi.string().regex(setRegex(
      6, undefined, ONE_UPPERCASE, ONE_LOWERCASE, ONE_DIGIT
    )).required()
  });
