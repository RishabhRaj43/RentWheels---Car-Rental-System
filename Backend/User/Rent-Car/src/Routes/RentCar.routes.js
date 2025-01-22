import express from "express";
import {
  getAllRentalsController,
  rentCarController,
} from "../Controllers/RentCar.controller.js";
import roleBasedProtect from "../Middlewares/ProtectRoute.js";

const rentCarRouter = express.Router();

rentCarRouter.get(
  "/get-all-rentals/:carId",
  roleBasedProtect(["user", "admin"]),
  getAllRentalsController
);

rentCarRouter.put("/cancel-rental/:rentalId", roleBasedProtect(["user"]));

rentCarRouter.post("/rent-car", roleBasedProtect(["user"]), rentCarController);

export default rentCarRouter;
