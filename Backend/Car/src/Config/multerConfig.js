import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const filename = req.body.model;
    return {
      folder: "car-images/" + filename,
      allowed_formats: ["jpeg", "png", "jpg", "webp"],
    };
  },
});

const upload = multer({ storage });

export default upload;
