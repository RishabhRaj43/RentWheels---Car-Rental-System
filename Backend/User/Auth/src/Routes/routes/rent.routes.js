import express from "express";
import protectRoute from "../../Middlewares/protectRoute.js";
import { getUsers, rentCar } from "../../Controller/RentCar/rentCar.controller.js";

const rentRouter = express.Router();

rentRouter.post("/rent-car", protectRoute, rentCar);

rentRouter.get("/get-users",protectRoute,getUsers);

export default rentRouter;
