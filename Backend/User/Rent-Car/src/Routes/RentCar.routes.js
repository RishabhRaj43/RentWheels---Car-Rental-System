import express from "express";
import { rentCarController } from "../Controllers/RentCar.controller.js";
import protectRoute from "../Middlewares/ProtectRoute.js";

const rentCarRouter = express.Router();

rentCarRouter.get("/", protectRoute, rentCarController);

export default rentCarRouter;
