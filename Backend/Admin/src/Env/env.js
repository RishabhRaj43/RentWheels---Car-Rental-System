import { configDotenv } from "dotenv";

configDotenv();

const env = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_ADMIN_SECRET: process.env.JWT_ADMIN_SECRET,
  BASE_URL: process.env.BASE_URL,
  REGISTER_OTP_QUEUE: process.env.REGISTER_OTP_QUEUE,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
};

export default env;
