import carValidationSchema from "../Validation/Validate.js";

export const getAllCars = (req, res) => {
  try {
    return res.status(200).json({ message: "Get all cars" });
  } catch (error) {
    console.error("Error in getAllCars controller: ", error);
    return res.status(500).json({ message: "Error getting all cars" });
  }
};

export const createCar = (req, res) => {
  try {
    const { error } = carValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      return res.status(400).json({ message: validationErrors });
    }

    if(!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const urls = req.files.map((file) => {
      return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    });

    console.log("Urls: ", urls);
    

    return res.status(200).json({ message: "Create car" });
  } catch (error) {
    console.error("Error in createCar controller: ", error);
    return res.status(500).json({ message: "Error creating car" });
  }
};
