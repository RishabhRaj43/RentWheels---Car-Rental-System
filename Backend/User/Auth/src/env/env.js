import { configDotenv } from "dotenv";

configDotenv();

const env = {
  MONGO_URI: process.env.MONGO_URI,
  USER_AUTH_PORT: process.env.USER_AUTH_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default env;
