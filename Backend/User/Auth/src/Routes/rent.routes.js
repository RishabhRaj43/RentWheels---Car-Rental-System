import express from "express";
import protectRoute from "../Middlewares/protectRoute.js";
import { rentCar } from "../Controller/RentCar/rentCar.controller.js";

const rentRouter = express.Router();

rentRouter.post("/rent-car", protectRoute, rentCar);

export default rentRouter;
