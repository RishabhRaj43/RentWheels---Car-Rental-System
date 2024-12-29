import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/DB/ConnectDB.js";
import authRouter from "./src/Routes/auth.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);

app.listen(process.env.USER_AUTH_PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.USER_AUTH_PORT}`);
});
