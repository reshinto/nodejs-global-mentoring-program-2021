import { Model } from 'sequelize';
import Group, { GroupAttributes, GroupCreationAttributes } from '../models/group';

export const addToGroupDb = async (newGroup: GroupAttributes): Promise<Model<GroupAttributes, GroupCreationAttributes>> => await Group.create(newGroup);

export const getGroupsInDb = async (): Promise<Model<GroupAttributes, GroupCreationAttributes>[]> => await Group.findAll({});

export const getGroupByIdInDb = async (id: string): Promise<Model<GroupAttributes, GroupCreationAttributes> | unknown> => await Group.findOne({
  where: { id }
});

export const updateGroupInDb = async (id: string, updatedGroup: GroupAttributes): Promise<Model<GroupAttributes, GroupCreationAttributes> | unknown> => await Group.update(updatedGroup, {
  where: { id }
});

export const deleteGroupInDb = async (id: string): Promise<Model<GroupAttributes, GroupCreationAttributes> | unknown> => await Group.destroy({
  where: { id }
});
