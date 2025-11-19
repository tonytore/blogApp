import env from "dotenv";
env.config();

const appConfig = {
  APP_NAME: process.env.APP_NAME,
  NODE_ENV: process.env.NODE_ENV as "development" | "production",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5000",
  DATABASE_URL: process.env.DATABASE_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  PORT: process.env.PORT,
  LOKI_URL: process.env.LOKI_URL,
};

export default appConfig;
