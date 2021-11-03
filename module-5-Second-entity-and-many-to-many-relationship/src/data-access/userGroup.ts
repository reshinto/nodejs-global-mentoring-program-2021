import { Model } from 'sequelize/types';
import UserGroup, { UserGroupAttributes, UserGroupCreationAttributes } from '../models/userGroup';

export const getUserGroupInDb = async (): Promise<Model<UserGroupAttributes, UserGroupCreationAttributes>[]> => await UserGroup.findAll({});

export const addUsersToGroupInDb = async (groupId: string, usersIds: string[]): Promise<Model<UserGroupAttributes, UserGroupCreationAttributes>[] | unknown> =>
  await UserGroup.bulkCreate(usersIds.map((userId) => ({
    user_id: userId,
    group_id: groupId
  })));
