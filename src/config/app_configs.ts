import env from 'dotenv';
env.config();

const appConfig = {
  NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  LOKI_URL: process.env.LOKI_URL,
};

export default appConfig;
