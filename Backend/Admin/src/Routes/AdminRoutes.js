import express from "express";
import {
  loginAdmin,
  registerAdmin,
  resendOtp,
  verifyOtp,
} from "../Controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);
adminRouter.get("/resend-otp", resendOtp);
adminRouter.post("/verify-otp", verifyOtp);

adminRouter.post("/login",loginAdmin);

export default adminRouter;
