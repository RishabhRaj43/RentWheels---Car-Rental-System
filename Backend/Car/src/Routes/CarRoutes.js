import { Router } from "express";
import { createCar, getAllCars } from "../Controllers/Car.controller.js";
import protectAdminRoute from "../Middlewares/protectAdminRoute.js";
import multer from "multer";
import upload from "../Config/multerConfig.js";
import { uploadMiddleware } from "../Middlewares/upload.middleware.js";

const carRouter = Router();

carRouter.get("/get-all-car", getAllCars);
carRouter.post("/create-car", protectAdminRoute, uploadMiddleware, createCar);
// carRouter.post("/upload", uploadMiddleware, (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: "No files uploaded" });
//     }
//     const urls = req.files.map((file) => {
//       return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
//     });
//     return res
//       .status(200)
//       .json({ message: "Uploaded image", urls, name: req.body.name });
//   } catch (error) {
//     console.error("Error in upload controller: ", error);
//     return res.status(500).json({ message: "Error uploading image" });
//   }
// });

export default carRouter;
