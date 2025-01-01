import mongoose from "mongoose";
import env from "../env/env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    process.exit(1);
  }
};

export default connectDB;
