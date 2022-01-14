import Joi from 'joi';
import { DataTypes, ModelDefined, Optional } from 'sequelize';
import { PERMISSIONS } from '../constants';
import { setRegex } from '../utils';
import { sequelize } from '../loaders/postgres';

export const groupSchema = Joi
  .object()
  .keys({
    name: Joi.string().min(1).required(),
    permissions: Joi.array().items(Joi.string().regex(setRegex(undefined, undefined, PERMISSIONS))).required()
  });

type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface GroupAttributes {
  id?: string;
  name: string;
  permissions: Array<Permission>;
  created_at?: string;
  updated_at?: string;
}

export type GroupCreationAttributes = Optional<GroupAttributes, 'id' | 'created_at' | 'updated_at'>;

const Group: ModelDefined<GroupAttributes, GroupCreationAttributes> = sequelize.define('groups', {
  id: { type: DataTypes.UUIDV4, unique: true, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
  name: { type: DataTypes.STRING, unique: true },
  permissions: DataTypes.ARRAY(DataTypes.STRING),
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, {
  createdAt: false,
  updatedAt: false
});

export default Group;

