import postgresLoader from './postgres';
import expressLoader from './express';
import express from 'express';

export default async ({ expressApp }: {expressApp: express.Application}): Promise<void> => {
  await postgresLoader();
  await expressLoader({ app: expressApp });
};
