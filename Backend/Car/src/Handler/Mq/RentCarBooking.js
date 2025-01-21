import Car from "../../Models/Car.model.js";
import rabbitMQService from "../../Services/RabbitMQ/RabbitMQService.js";
import { rabbitMQqueues } from "../../Env/RabbitMQ/RabbitMQ.q.js";

export const rentCarBooking = async () => {
  try {
    const channel = await rabbitMQService.getChannel();
    await channel.assertQueue(rabbitMQqueues.RENT_CAR_FOR_CAR, {
      durable: true,
    });
    channel.consume(
      rabbitMQqueues.RENT_CAR_FOR_CAR,
      async (msg) => {
        if (msg) {
          const data = JSON.parse(msg.content.toString());
          await Car.findByIdAndUpdate(
            data.carId,
            {
              $addToSet: {
                rentals: data._id,
              },
            },
            { new: true }
          );
          channel.ack(msg);
        } else {
          console.log("No message received");
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("rentcarBooking Error: ", error.message);
    throw new Error("Error renting car");
  }
};
