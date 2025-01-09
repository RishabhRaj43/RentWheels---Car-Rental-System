import express from "express";
import { rentCarController } from "../Controllers/RentCar.controller.js";
import protectRoute from "../Middlewares/ProtectRoute.js";

const rentCarRouter = express.Router();

rentCarRouter.get("/", protectRoute, async (req, res) => {
  res.json({
    message: "Hello User",
  });
});

rentCarRouter.post("/rent-car", protectRoute, rentCarController);

export default rentCarRouter;
