import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import rentCarRouter from "../Routes/RentCar.routes.js";

const app = express();
app.use(cors({
  origin: "http://localhost:8011",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(cookieParser());
app.use(express.json());

app.get("/",rentCarRouter )

export default app;
