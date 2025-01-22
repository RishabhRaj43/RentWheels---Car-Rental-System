import User from "../../Model/User.model.js";
import rabbitMQService from "../../Services/Mq/rabbitMq.js";
import rabbitMQqueues from "../../config/env/RabbitMQ/rabbitMQ.q.js";

export const rentcarBooking = async () => {
  try {
    const channel = await rabbitMQService.getChannel();
    await channel.assertQueue(rabbitMQqueues.RENT_CAR_FOR_USER, {
      durable: true,
    });
    channel.consume(
      rabbitMQqueues.RENT_CAR_FOR_USER,
      async (msg) => {
        if (msg) {
          const data = JSON.parse(msg.content.toString()).rental;
          await User.findByIdAndUpdate(
            data.userId,
            {
              $addToSet: {
                Rentals: data._id,
              },
            },
            { new: true }
          );
          channel.assertQueue(rabbitMQqueues.RENT_CAR_APPROVED_BY_USER, {
            durable: true,
          });

          channel.sendToQueue(
            rabbitMQqueues.RENT_CAR_APPROVED_BY_USER,
            Buffer.from(
              JSON.stringify({
                rentalId: data._id,
                status: "approved",
              })
            )
          );
          channel.ack(msg);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.log("rentcarBooking Error: ", error);
    throw new Error("Error renting car");
  }
};
