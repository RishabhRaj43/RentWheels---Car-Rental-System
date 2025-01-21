import express from "express";
import {
  getAllRentalsController,
  rentCarController,
  test,
} from "../Controllers/RentCar.controller.js";
import roleBasedProtect from "../Middlewares/ProtectRoute.js";

const rentCarRouter = express.Router();

rentCarRouter.get(
  "/get-all-reviews/:carId",
  roleBasedProtect(["user", "admin"]),
  getAllRentalsController
);

rentCarRouter.post("/rent-car", roleBasedProtect(["user"]), rentCarController);

export default rentCarRouter;
