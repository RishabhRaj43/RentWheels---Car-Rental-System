import { configDotenv } from "dotenv";

configDotenv();

const env = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ADMIN_SECRET: process.env.JWT_ADMIN_SECRET,
  RENTAL_QUEUE: process.env.RENTAL_QUEUE,
  BASE_URL: process.env.BASE_URL,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
};

export default env;
