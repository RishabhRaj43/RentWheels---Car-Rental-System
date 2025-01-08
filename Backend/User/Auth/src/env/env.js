import { configDotenv } from "dotenv";

configDotenv();

const env = {
  MONGO_URI: process.env.MONGO_URI,
  USER_AUTH_PORT: process.env.USER_AUTH_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  REGISTER_OTP_QUEUE: process.env.REGISTER_OTP_QUEUE,
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
};

export default env;
