import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import proxy from "express-http-proxy";

const app = express();
dotenv.config();

app.use(cors());

app.use("/auth", proxy(process.env.AUTH_PORT));

app.listen(process.env.USER_PORT, () => {
  console.log(`Server is running on port ${process.env.USER_PORT}`);
});
