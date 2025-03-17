import { config } from 'dotenv';

config({
  path: `.env`,
});

export const {
  PORT,
  DB_URI,
  NODE_ENV,
  JWT_SECRET,
  JWT_EXPRIES_IN,
  REDIS_PORT,
  REDIS_HOST,
  REDIS_PASSWORD
} = process.env;


