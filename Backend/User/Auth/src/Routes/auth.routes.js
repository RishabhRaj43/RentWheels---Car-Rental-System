import express from "express";
import { registerUser, searchUser } from "../Controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.get("/search",searchUser);

export default authRouter;
