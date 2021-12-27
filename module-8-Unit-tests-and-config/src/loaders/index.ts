import postgresLoader from './postgres';
import setupPassport from './passport-setup';

export default async (): Promise<void> => {
  await postgresLoader();
  await setupPassport();
};
