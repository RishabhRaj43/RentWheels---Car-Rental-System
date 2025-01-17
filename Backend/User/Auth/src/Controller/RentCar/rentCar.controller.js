import User from "../../Model/User.model.js";

export const rentCar = async (req, res) => {
  try {
    const { rentalId } = req.body;
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.Rentals.push(rentalId);
    await user.save();
    return res.status(200).json({ message: "Car rented successfully" });
  } catch (error) {
    console.error("Error renting car:", error);
    return res.status(500).json({ message: "Error renting car" });
  }
};
