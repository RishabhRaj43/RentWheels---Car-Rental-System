import User from "../../Model/User.model.js";

export const rentCar = async (req, res) => {
  try {
    const { rentalId } = req.body;
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.Rentals.push(rentalId);
    
    // await 

    await user.save();
    return res
      .status(200)
      .json({ message: "Car rented successfully", status: "approved" });
  } catch (error) {
    console.error("Error renting car:", error);
    return res.status(500).json({ message: "Error renting car" });
  }
};

export const getUsers = async (req, res) => {
  try {
    let RentalIds = req.query.rentalIds;

    RentalIds = RentalIds.split(",").map((id) => id.trim());

    if (!Array.isArray(RentalIds) || RentalIds.length === 0) {
      return res.status(400).json({ message: "Invalid rentalIds format" });
    }

    const dataToFind = req.query.dataToFind;
    const users = await User.find({
      Rentals: {
        $in: RentalIds,
      },
    }).select(dataToFind);

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
