import Joi from 'joi';
import { ONE_DIGIT, ONE_LOWERCASE, ONE_SPECIAL_CHAR, ONE_UPPERCASE } from './constants';
import { setRegex } from './utils';

export const userSchema = Joi
  .object()
  .keys({
    id: Joi.string().regex(setRegex(
      6, undefined, ONE_LOWERCASE, ONE_DIGIT, ONE_SPECIAL_CHAR
    )),
    login: Joi.string().alphanum().required(),
    password: Joi.string().regex(setRegex(
      6, undefined, ONE_UPPERCASE, ONE_LOWERCASE, ONE_DIGIT
    )).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean()
  });

