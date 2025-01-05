import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  searchUser,
  updateUser,
} from "../Controller/auth.controller.js";
import protectRoute from "../Middlewares/protectRoute.js";
import checkUserLoggedIn from "../utils/checkLogin.js";
import upload from "../config/multerConfig.js";

const authRouter = express.Router();

authRouter.post("/register", checkUserLoggedIn, registerUser);
authRouter.post("/login", checkUserLoggedIn, loginUser);
authRouter.delete("/logout", logoutUser);

authRouter.get("/search", protectRoute, searchUser);
authRouter.put("/update", protectRoute, upload.single("avatar"), updateUser);

export default authRouter;
