import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import carRouter from "../Routes/CarRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", carRouter);

export default app;
