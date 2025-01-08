import dotenv from "dotenv";

dotenv.config();

const env = {
  AUTH_PORT: process.env.AUTH_PORT,
  USER_PORT : process.env.USER_PORT,
  RENT_CAR_PORT : process.env.RENT_CAR_PORT
};

export default env;
