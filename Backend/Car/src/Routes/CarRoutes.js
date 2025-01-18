import { Router } from "express";
import {
  createCar,
  deprecateCar,
  getAllCars,
  getCarById,
  updateCar,
} from "../Controllers/Car.controller.js";
import protectAdminRoute from "../Middlewares/protectAdminRoute.js";
import { uploadMiddleware } from "../Middlewares/upload.middleware.js";
import protectRoute from "../Middlewares/ProtectRoute.js";
import { createReview } from "../Controllers/review.controller.js";

const carRouter = Router();

carRouter.get("/get-all-car", getAllCars);
carRouter.get("/get-car-by-id/:id", getCarById);

carRouter.post("/create-car", protectAdminRoute, uploadMiddleware, createCar);
carRouter.put(
  "/update-car/:id",
  protectAdminRoute,
  uploadMiddleware,
  updateCar
);
carRouter.delete("/deprecate-car/:id", protectAdminRoute, deprecateCar);

carRouter.post("/review-car", protectRoute, createReview);

export default carRouter;
