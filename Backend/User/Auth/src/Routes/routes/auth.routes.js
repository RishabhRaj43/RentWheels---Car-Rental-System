import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  searchUser,
  verifyOtp,
  updateUser,
  resendOtp,
} from "../../Controller/auth.controller.js";
import protectRoute from "../../Middlewares/protectRoute.js";
import checkUserLoggedIn from "../../Middlewares/checkLogin.js";
import upload from "../../config/multerConfig.js";

const authRouter = express.Router();

authRouter.post("/register", checkUserLoggedIn, registerUser);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/resend-otp", resendOtp);
authRouter.post("/login", checkUserLoggedIn, loginUser);
authRouter.delete("/logout", logoutUser);

authRouter.get("/search", protectRoute, searchUser);
authRouter.put("/update", protectRoute, upload.single("avatar"), updateUser);

export default authRouter;
