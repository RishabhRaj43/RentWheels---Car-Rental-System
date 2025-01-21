import mongoose from "mongoose";
import env from "../Config/Env/env.js";

export const connectMongoDb = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
    throw error;
  }
};
