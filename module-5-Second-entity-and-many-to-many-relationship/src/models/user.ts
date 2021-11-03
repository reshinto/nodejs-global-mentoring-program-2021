import Joi from 'joi';
import { DataTypes, ModelDefined, Optional } from 'sequelize';
import { ONE_DIGIT, ONE_LOWERCASE, ONE_UPPERCASE } from '../constants';
import { setRegex } from '../utils';
import { sequelize } from '../loaders/postgres';

export const userSchema = Joi
  .object()
  .keys({
    login: Joi.string().alphanum().min(3).required(),
    password: Joi.string().regex(setRegex(
      6, undefined, ONE_UPPERCASE, ONE_LOWERCASE, ONE_DIGIT
    )).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean()
  });

export interface UserAttributes {
  id?: string;
  login: string;
  password: string;
  age: number;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'is_deleted' | 'created_at' | 'updated_at'>;

const User: ModelDefined<UserAttributes, UserCreationAttributes> = sequelize.define('users', {
  id: { type: DataTypes.UUIDV4, unique: true, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
  login: DataTypes.STRING,
  password: DataTypes.STRING,
  age: DataTypes.SMALLINT,
  is_deleted: DataTypes.BOOLEAN,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, {
  createdAt: false,
  updatedAt: false
});

export default User;
