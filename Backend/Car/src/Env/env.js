import { configDotenv } from "dotenv";

configDotenv();

const env = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ADMIN_SECRET: process.env.JWT_ADMIN_SECRET,
  BASE_URL: process.env.BASE_URL,
};

export default env;
