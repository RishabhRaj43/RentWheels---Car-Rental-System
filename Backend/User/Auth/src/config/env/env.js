import { configDotenv } from "dotenv";

configDotenv();

const env = {
  MONGO_URI: process.env.MONGO_URI,
  USER_AUTH_PORT: process.env.USER_AUTH_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
};

export default env;
