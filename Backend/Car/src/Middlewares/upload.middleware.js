import multer from "multer";
import upload from "../Config/multerConfig.js";

export const uploadMiddleware = (req, res, next) => {
  upload.array("car-images")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};
