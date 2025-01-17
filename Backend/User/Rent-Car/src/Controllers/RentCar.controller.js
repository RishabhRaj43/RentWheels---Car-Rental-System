import api from "../Apis/api.js";
import env from "../Config/Env/env.js";
import RentCar from "../Models/RentCar.model.js";

export const rentCarController = async (req, res) => {
  try {
    const { userId } = req;
    const { carId, startDate, endDate, totalAmount } = req.body;
    const rental = await RentCar.create({
      carId,
      userId,
      startDate,
      endDate,
      totalAmount,
      status: "pending",
    });
    const response = await api.post(
      "/user/auth/rent-car",
      {
        rentalId: rental._id,
      },
      {
        headers: {
          Authorization: `Bearer ${req.token || ""}`,
        },
      }
    );
    return res.status(200).json({ message: response.data.message });
  } catch (error) {
    console.error("Error in RentCarController: ", error.message);
    if (error.response) {
      return res.status(error.response.status).json({
        message: error.response.data.message,
      });
    }
    return res.status(500).json({ message: error.message });
  }
};
