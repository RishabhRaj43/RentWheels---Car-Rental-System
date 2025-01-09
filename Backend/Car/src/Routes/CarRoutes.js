import { Router } from "express";
import { createCar, getAllCars } from "../Controllers/Car.controller.js";
import protectAdminRoute from "../Middlewares/protectAdminRoute.js";

const carRouter = Router();

carRouter.get("/get-all-car", getAllCars);
carRouter.post("/create-car", protectAdminRoute, createCar);

export default carRouter;
