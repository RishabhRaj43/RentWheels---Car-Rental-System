import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => { 
    return {
      folder: `users`,
      allowed_formats: ["jpeg", "png", "jpg", "webp"],
    };
  },
});

const upload = multer({ storage });

export default upload;
