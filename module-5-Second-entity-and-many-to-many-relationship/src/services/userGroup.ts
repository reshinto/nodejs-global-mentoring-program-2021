import { Model } from 'sequelize/types';
import { addUsersToGroupInDb, getUserGroupInDb } from '../data-access/userGroup';
import { sequelize } from '../loaders/postgres';

export const getUserGroup = async (): Promise<Model[] | unknown[]> => {
  try {
    return await getUserGroupInDb() || [];
  } catch (error) {
    return [error];
  }
};

export const addUsersToGroup = async (groupId: string, userIds: string[]): Promise<Model[] | unknown[]> => {
  try {
    return await sequelize.transaction(async () => {
      await addUsersToGroupInDb(groupId, userIds);
      return await getUserGroupInDb();
    });
  } catch (error) {
    return [error];
  }
};
