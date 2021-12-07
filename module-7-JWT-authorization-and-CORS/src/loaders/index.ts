import postgresLoader from './postgres';
import expressLoader from './express';
import express from 'express';
import setupPassport from './passport-setup';

export default async ({ expressApp }: {expressApp: express.Application}): Promise<void> => {
  await postgresLoader();
  await setupPassport();
  await expressLoader({ app: expressApp });
};
