import api from "../Apis/api.js";
import { rabbitMQqueues } from "../Config/Env/RabbitMQ/RabbitMQ.q.js";
import RentCar from "../Models/RentCar.model.js";
import { publishMessage } from "../Services/MQ/RabbitMQProducer.js";

export const getAllRentalsController = async (req, res) => {
  try {
    const carId = req.params.carId;
    const token = req.token;

    const Rentals = await RentCar.find({ carId }).select("_id");
    const RentalIds = Rentals.map((rental) => rental._id);

    const dataToFind = "name email";
    const response = await api.get(
      `/user/auth/rent/get-users?rentalIds=${RentalIds}&dataToFind=${dataToFind}`,
      {
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      }
    );
    return res
      .status(200)
      .json({ message: response.message, data: response.data });
  } catch (error) {
    console.error("Error in getAllReviewsController: ", error.message);
    if (error.response) {
      return res.status(error.response.status).json({
        message: error.response.data.message,
      });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const rentCarController = async (req, res) => {
  try {
    const userId = req.id;
    const { carId, startDate, endDate, totalAmount } = req.body;
    const rental = new RentCar({
      carId,
      userId,
      startDate,
      endDate,
      totalAmount,
      status: "pending",
    });

    await Promise.all([
      publishMessage(rabbitMQqueues.RENT_CAR_FOR_CAR, {
        rental: rental.toObject(),
      }),
      publishMessage(rabbitMQqueues.RENT_CAR_FOR_USER, {
        rental: rental.toObject(),
      }),
    ]);

    await rental.save();
    return res.status(200).json({ message: "Processing your request..." });
  } catch (error) {
    console.error("Error in RentCarController: ", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const cancelRentalController = async (req, res) => {
  try {
    const rentalId = req.params.rentalId;
    await RentCar.findByIdAndUpdate(rentalId, { status: "cancelled" });
    return res.status(200).json({ message: "Rental cancelled successfully" });
  } catch (error) {
    console.error("Error in cancelRentalController: ", error.message);
    return res.status(500).json({ message: error.message });
  }
};
