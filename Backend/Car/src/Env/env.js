import { configDotenv } from "dotenv";

configDotenv();

const env = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  RENTAL_QUEUE: process.env.RENTAL_QUEUE,
}

export default env;
