import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  ROLE_SECRET: {
    user: process.env.JWT_SECRET,
  },
  BASE_URL: process.env.BASE_URL,
};

export default env;
