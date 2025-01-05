import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./src/DB/ConnectDB.js";
import authRouter from "./src/Routes/auth.routes.js";
import env from "./src/env/env.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/src/uploads", express.static(path.join(__dirname,"src", "uploads")));

app.use("/", authRouter);

app.listen(env.USER_AUTH_PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${process.env.USER_AUTH_PORT}`);
});
