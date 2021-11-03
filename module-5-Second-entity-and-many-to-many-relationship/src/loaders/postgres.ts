import { Sequelize } from 'sequelize';
import config from '../config';

export const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    host: 'db',
    dialect: 'postgres'
  }
);

export default async function connectDb(retries = 10): Promise<void> {
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      break;
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
}
