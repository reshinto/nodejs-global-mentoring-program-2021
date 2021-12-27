import 'dotenv/config';

export default {
  dbName: process.env.POSTGRES_DB as string || 'db',
  dbUser: process.env.POSTGRES_USER as string || 'dbUser',
  dbPassword: process.env.POSTGRES_PASSWORD || 'dbPw',
  logLevel: process.env.LOG_LEVEL || 'info',
  tokenSecret: process.env.TOKEN_SECRET || 'secret'
};
