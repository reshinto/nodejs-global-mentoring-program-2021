import { addToUsersDb, getAutoSuggestUsers, getNonDeletedUser, getNonDeletedUsers, updateUserInDb } from '../data-access/user';
import { Model } from 'sequelize/types';
import { UserAttributes } from '../models/user';

export const addUser = async (newUser: UserAttributes): Promise<Model[]> => {
  await addToUsersDb(newUser);
  return await getNonDeletedUsers();
};

export const getUsers = async (): Promise<Model[]> => await getNonDeletedUsers() || [];

export const getUser = async (id: string): Promise<UserAttributes | unknown> =>  await getNonDeletedUser(id) || {};

export const updateUser = async (id: string, updatedUser: UserAttributes): Promise<UserAttributes | unknown> => {
  await updateUserInDb(id, updatedUser);
  return await getNonDeletedUser(id) || {};
};

export const softDeleteUser = async (id: string): Promise<Model[]> => {
  const user = await getNonDeletedUser(id) as UserAttributes;
  await updateUserInDb(id, { ...user, is_deleted: true });
  return await getNonDeletedUsers() || [];
};

export const getSuggestedUsers = async (loginSubString: string, _limit: string, orderBy: string): Promise<Model[]> => {
  const limit = _limit ? parseInt(_limit, 10) : undefined;
  return await getAutoSuggestUsers(loginSubString, limit, [['login', orderBy?.toUpperCase()]]) || [];
};
