import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import adminRouter from "../Routes/AdminRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/src/uploads", express.static(path.join(__dirname, "src", "uploads")));

app.use("/auth", adminRouter);

export default app;
