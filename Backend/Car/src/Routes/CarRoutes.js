import { Router } from "express";
import {
  createCar,
  deprecateCar,
  getAllCars,
  getCarById,
  updateCar,
} from "../Controllers/Car.controller.js";
import { uploadMiddleware } from "../Middlewares/upload.middleware.js";
import roleBasedProtect from "../Middlewares/ProtectRoute.js";
import { createReview } from "../Controllers/review.controller.js";

const carRouter = Router();

carRouter.get("/get-all-car", getAllCars);
carRouter.get("/get-car-by-id/:id", getCarById);

carRouter.post(
  "/create-car",
  roleBasedProtect("admin"),
  uploadMiddleware,
  createCar
);
carRouter.put(
  "/update-car/:id",
  roleBasedProtect("admin"),
  uploadMiddleware,
  updateCar
);
carRouter.delete("/deprecate-car/:id", roleBasedProtect("admin"), deprecateCar);

carRouter.post(
  "/review-car",
  roleBasedProtect(["user", "admin"]),
  createReview
);

export default carRouter;
