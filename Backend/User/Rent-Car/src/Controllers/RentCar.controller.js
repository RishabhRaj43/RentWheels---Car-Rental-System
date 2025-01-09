import { publishMessage } from "../Config/RabbitMq.js";
import env from "../Env/env.js";

export const rentCarController = async (req, res) => {
  try {
    const email = req.email;
    const { carId, userId } = req.body;

    await publishMessage(
      env.RENTAL_QUEUE,
      JSON.stringify({ email, carId, userId })
    );

    return res.status(200).json({ message: "Car rented successfully" });
  } catch (error) {
    console.error("Error in RentCarController: ", error.message);
    return res.status(500).json({ message: error.message });
  }
};
