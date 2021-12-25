import { addToUsersDb, getAutoSuggestUsers, getNonDeletedUser, getNonDeletedUsers, updateUserInDb } from '../data-access/user';
import { Model } from 'sequelize/types';
import { UserAttributes } from '../models/user';
import { logError } from '../utils';

export const addUser = async (newUser: UserAttributes): Promise<Model[] | unknown[]> => {
  try {
    await addToUsersDb(newUser);
    return await getNonDeletedUsers();
  } catch (error: unknown) {
    const err = new Error();
    logError(err, error, newUser);
    return [error];
  }
};

export const getUsers = async (): Promise<Model[] | unknown[]> => {
  try {
    return await getNonDeletedUsers() || [];
  } catch (error: unknown) {
    const err = new Error();
    logError(err, error);
    return [error];
  }
};

export const getUser = async (id: string): Promise<UserAttributes | unknown> =>  {
  try {
    return await getNonDeletedUser(id) || {};
  } catch (error: unknown) {
    const err = new Error();
    logError(err, error, id);
    return error;
  }
};

export const updateUser = async (id: string, updatedUser: UserAttributes): Promise<UserAttributes | unknown> => {
  try {
    await updateUserInDb(id, updatedUser);
    return await getNonDeletedUser(id) || {};
  } catch (error: unknown) {
    const err = new Error();
    logError(err, error, id, updateUser);
    return error;
  }
};

export const softDeleteUser = async (id: string): Promise<Model[] | unknown[]> => {
  try {
    const user = await getNonDeletedUser(id) as UserAttributes;
    await updateUserInDb(id, { ...user, is_deleted: true });
    return await getNonDeletedUsers() || [];
  } catch (error: unknown) {
    const err = new Error();
    logError(err, error, id);
    return [error];
  }
};

export const getSuggestedUsers = async (loginSubString: string, _limit: string, orderBy: string): Promise<Model[] | unknown[]> => {
  try {
    const limit = _limit ? parseInt(_limit, 10) : undefined;
    return await getAutoSuggestUsers(loginSubString, limit, [['login', orderBy?.toUpperCase()]]) || [];
  } catch (error: unknown) {
    const err = new Error();
    logError(err, error, loginSubString);
    return [error];
  }
};
