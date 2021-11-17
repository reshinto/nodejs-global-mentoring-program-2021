import { Model, Op, Order } from 'sequelize';
import User, { UserAttributes, UserCreationAttributes } from '../models/user';

export const addToUsersDb = async (newUser: UserAttributes): Promise<Model<UserAttributes, UserCreationAttributes>> => await User.create(newUser);

export const getNonDeletedUsers = async (): Promise<Model<UserAttributes, UserCreationAttributes>[]> => await User.findAll({
  where: { is_deleted: false }
});

export const getNonDeletedUser = async (id: string): Promise<Model<UserAttributes, UserCreationAttributes> | unknown> => await User.findOne({
  where: { is_deleted: false, id }
});

export const getAutoSuggestUsers = async (loginSubString: string, limit?: number, orderItems?: Order): Promise<Model<UserAttributes, UserCreationAttributes>[]> => await User.findAll({
  where: { is_deleted: false, login: {
    [Op.iLike]: `%${loginSubString}%`
  } },
  limit: limit ? limit : undefined,
  order: orderItems
});

export const updateUserInDb = async (id: string, updatedUser: UserAttributes): Promise<Model<UserAttributes, UserCreationAttributes> | unknown> => await User.update(updatedUser, {
  where: { id }
});
