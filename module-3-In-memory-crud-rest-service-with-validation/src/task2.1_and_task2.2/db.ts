import { v4 as uuidv4 } from 'uuid';

export type usersType = {
  id?: string;
  login: string;
  password: string;
  age: number;
  isDeleted?: boolean;
}

export type dbType = {
  users: usersType[]
}

export const db: dbType = {
  users: [
    { id: uuidv4(), login: 'Diana', password: 'Password1', age: 21, isDeleted: false },
    { id: uuidv4(), login: 'Max', password: 'Password2', age: 24, isDeleted: false },
    { id: uuidv4(), login: 'Mary', password: 'Password3', age: 23, isDeleted: false },
    { id: uuidv4(), login: 'Tom', password: 'Password4', age: 25, isDeleted: true }
  ]
};
