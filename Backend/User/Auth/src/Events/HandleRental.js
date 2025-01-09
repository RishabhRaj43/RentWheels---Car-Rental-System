import env from "../env/env.js";
import User from "../Model/User.model.js";
import { channel } from "../Services/Mq/rabbitMq.js";

export const handleRental = async () => {
  try {
    if (!channel) await connectRabbitMq();
    const queueName = env.RENTAL_QUEUE || "rental-queue";
    await channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, async (msg) => {
      if (msg) {
        const { email, carId, userId } = JSON.parse(msg.content.toString());
        const user = await User.findById(userId);
        if (user) {
          // user.Rentals.push(carId);
          console.log("Rental added successfully");

          await user.save();
        }
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log("HandleRental Error: ", error);
    throw new Error("Error Handling Rental");
  }
};
