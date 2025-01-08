import mongoose from "mongoose";
import env from "../Env/env.js";

export const connectMongoDb = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
    throw error;
  }
};
