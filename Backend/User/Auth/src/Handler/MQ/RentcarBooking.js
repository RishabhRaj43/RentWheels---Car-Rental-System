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
          const data = JSON.parse(msg.content.toString());
          const user = await User.findById(data.userId);
          // await User.findByIdAndUpdate(
          //   data.userId,
          //   {
          //     $push: { Rentals: data.rentalId },
          //   },
          //   { new: true }
          // );
          user.Rentals.push(data._id);
          console.log("user.Rentals: ", user.Rentals);

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
