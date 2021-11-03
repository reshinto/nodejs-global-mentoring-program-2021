import 'dotenv/config';

export default {
  dbName: process.env.POSTGRES_DB as string,
  dbUser: process.env.POSTGRES_USER as string,
  dbPassword: process.env.POSTGRES_PASSWORD
};
