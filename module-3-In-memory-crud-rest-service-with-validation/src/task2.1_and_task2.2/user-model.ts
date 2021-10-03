import { v4 as uuidv4 } from 'uuid';
import { db, usersType } from './db';

export const addToUsersDb = (newUser: usersType): usersType[] => {
  const userWithIsDeletedFlag = {
    ...newUser,
    id: uuidv4(),
    isDeleted: false
  };

  db.users.push(userWithIsDeletedFlag);
  return getNonDeletedUsers();
};

export const getNonDeletedUsers = (): usersType[] => db.users.filter((user: usersType) => user.isDeleted === false);

export const getNonDeletedUser = (id: string): usersType | unknown =>  db.users.find((user) => user.id === id && !user.isDeleted) || {};

export const updateUserInDb = (id: string, updatedUser: usersType): usersType | unknown => {
  let currentUser: usersType = <usersType>{};
  db.users = db.users.map((user) => {
    if (user.id === id) {
      currentUser = { ...user, ...updatedUser };
      return currentUser;
    }
    return user;
  });
  return currentUser.isDeleted ? {} : currentUser;
};

export const softDeleteUserInDb = (id: string): usersType[] => {
  const tempUsers: usersType[] = [];
  db.users = db.users.map((user) => {
    if (user.id === id) {
      return { ...user, isDeleted: true };
    }
    if (!user.isDeleted) {
      tempUsers.push(user);
    }
    return user;
  });
  return tempUsers;
};

export const getAutoSuggestUsers = (loginSubString: string, limit: string): usersType[] => {
  const suggestedUsers: usersType[] = db.users.filter((user) => !user.isDeleted && user.login?.toLowerCase().includes(loginSubString.toLowerCase()));

  suggestedUsers.sort((a: usersType, b: usersType): number => {
    if (a.login > b.login) {
      return 1;
    }
    if (a.login < b.login) {
      return -1;
    }
    return 0;
  });
  return suggestedUsers.slice(0, parseInt(limit, 10));
};
