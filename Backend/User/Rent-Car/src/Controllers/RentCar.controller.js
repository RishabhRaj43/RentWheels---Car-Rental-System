import api from "../Apis/api.js";
import env from "../Config/Env/env.js";
import eventEmitter from "../Events/EventEmitter.js";
import RentCar from "../Models/RentCar.model.js";

export const rentCarController = async (req, res) => {
  try {
    const { email, userId } = req;
    const { carId, startDate, endDate, totalAmount } = req.body;
    const rental = await RentCar.create({
      carId,
      userId,
      startDate,
      endDate,
      totalAmount,
      status: "pending",
    });
    const response = api.post("/user/auth/");
    return res.status(200).json({ message: "Processing request..." });
  } catch (error) {
    console.error("Error in RentCarController: ", error.message);
    return res.status(500).json({ message: error.message });
  }
};
