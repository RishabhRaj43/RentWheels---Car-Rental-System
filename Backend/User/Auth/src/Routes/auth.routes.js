import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  searchUser,
} from "../Controller/auth.controller.js";
import protectRoute from "../Middlewares/protectRoute.js";
import checkUserLoggedIn from "../utils/checkLogin.js";

const authRouter = express.Router();

authRouter.post("/register", checkUserLoggedIn, registerUser);
authRouter.post("/login", checkUserLoggedIn, loginUser);
authRouter.get("/search", protectRoute, searchUser);
authRouter.delete("/logout", protectRoute, logoutUser);

export default authRouter;
