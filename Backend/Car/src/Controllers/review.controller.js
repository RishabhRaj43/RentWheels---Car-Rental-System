import Car from "../Models/Car.model.js";

export const createReview = async (req, res) => {
  try {
    const { id } = req.params;
    let { review, rating } = req.body;

    const car = await Car.findById(id);

    if (isNaN(rating)) {
      rating = parseInt(rating);
    }

    if (rating < 0 || rating > 10) {
      return res
        .status(400)
        .json({ message: "Rating must be between 0 and 10" });
    }

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    const totalReview = {
      userId: req.id,
      review,
      rating,
    };

    car.reviews.push(totalReview);
    await car.save();

    return res.status(200).json({ message: "Car reviewed successfully" });
  } catch (error) {
    console.error("Error in createReview controller: ", error.message);
    return res.status(500).json({ message: "Error creating review" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id)
    .populate("reviews.userId", "email");

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res.status(200).json({ reviews: car });
  } catch (error) {
    console.error("Error in getAllReviews controller: ", error.message);
    return res.status(500).json({ message: "Error getting reviews" });
  }
};
