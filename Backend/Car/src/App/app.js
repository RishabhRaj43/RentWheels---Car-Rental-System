import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import carRouter from "../Routes/CarRoutes.js";

const app = express();
app.use(cors());
// app.use((req, res, next) => {
//   const contentType = req.headers["content-type"] || "";
//   if (contentType.includes("multipart/form-data")) {
//     next();
//   } else {
//     express.json()(req, res, next);
//   }
// });
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/src/uploads", express.static(path.join(__dirname, "src", "uploads")));

app.use("/", carRouter);

export default app;
