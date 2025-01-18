import Car from "../Models/Car.model.js";

export const createReview = async (req, res) => {
  return res.status(200).json({ message: "Review created successfully" });
};
