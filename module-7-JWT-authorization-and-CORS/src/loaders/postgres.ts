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

async function connectDb(retries = 10): Promise<void> {
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      break;
    } catch (error) {
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000));
    }
  }
}

export default connectDb;
