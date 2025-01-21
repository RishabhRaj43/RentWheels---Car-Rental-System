import { configDotenv } from "dotenv";

configDotenv();

const env = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  BASE_URL: process.env.BASE_URL,
  CLOUD_NAME: process.env.CLOUD_NAME,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
  ROLE_SECRET: {
    admin: process.env.JWT_ADMIN_SECRET,
    user: process.env.JWT_SECRET,
  },
};

export default env;
