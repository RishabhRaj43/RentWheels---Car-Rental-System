import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  BASE_URL: process.env.BASE_URL,
  RENTAL_QUEUE: process.env.RENTAL_QUEUE,
};

export default env;
