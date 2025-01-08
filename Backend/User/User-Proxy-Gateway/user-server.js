import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import proxy from "express-http-proxy";
import env from "./env/env.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:8012",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/auth", proxy(env.AUTH_PORT));
app.use("/rent-car", proxy(env.RENT_CAR_PORT));

app.listen(env.USER_PORT, () => {
  console.log(`Server is running on port ${process.env.USER_PORT}`);
});
