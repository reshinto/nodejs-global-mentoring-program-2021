import { Model } from 'sequelize/types';
import { addToGroupDb, deleteGroupInDb, getGroupByIdInDb, getGroupsInDb, updateGroupInDb } from '../data-access/group';
import { GroupAttributes } from '../models/group';
import { logError } from '../utils';

export const addGroup = async (newGroup: GroupAttributes): Promise<Model[] | unknown[]> => {
  try {
    await addToGroupDb(newGroup);
    return await getGroupsInDb();
  } catch (error) {
    const err = new Error();
    logError(err, error, newGroup);
    return [error];
  }
};

export const getGroups = async (): Promise<Model[] | unknown[]> => {
  try {
    return await getGroupsInDb() || [];
  } catch (error: unknown) {
    const err = new Error();
    logError(err, error);
    return [error];
  }
};

export const getGroup = async (id: string): Promise<GroupAttributes | unknown> =>  {
  try {
    return await getGroupByIdInDb(id) || {};
  } catch (error: unknown) {
    const err = new Error();
    logError(err, error, id);
    return error;
  }
};

export const updateGroup = async (id: string, updatedGroup: GroupAttributes): Promise<GroupAttributes | unknown> => {
  try {
    await updateGroupInDb(id, updatedGroup);
    return await getGroupByIdInDb(id);
  } catch (error: unknown) {
    const err = new Error();
    logError(err, error, id, updatedGroup);
    return error;
  }
};

export const deleteGroup = async (id: string): Promise<Model[] | unknown[]> => {
  try {
    await deleteGroupInDb(id);
    return await getGroupsInDb() || [];
  } catch (error: unknown) {
    const err = new Error();
    logError(err, error, id);
    return [error];
  }
};
