import express from "express";
import { rentCarController } from "../Controllers/RentCar.controller.js";
import roleBasedProtect from "../Middlewares/ProtectRoute.js";

const rentCarRouter = express.Router();

rentCarRouter.get(
  "/",
  roleBasedProtect(["user", "admin"]),
  async (req, res) => {
    res.json({
      message: "Hello User",
    });
  }
);

rentCarRouter.post("/rent-car", roleBasedProtect(["user"]), rentCarController);

export default rentCarRouter;
