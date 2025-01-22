import rabbitMQService from "../Services/MQ/RabbitMQService.js";
import { rabbitMQqueues } from "../Config/Env/RabbitMQ/RabbitMQ.q.js";
import RentCar from "../Models/RentCar.model.js";

export const rentCarApproved = async (message) => {
  try {
    const channel = await rabbitMQService.getChannel();
    await channel.assertQueue(rabbitMQqueues.RENT_CAR_APPROVED_BY_USER, {
      durable: true,
    });
    await channel.assertQueue(rabbitMQqueues.RENT_CAR_APPROVED_BY_CAR, {
      durable: true,
    });

    channel.consume(
      rabbitMQqueues.RENT_CAR_APPROVED_BY_USER,
      async (msg) => {
        const { rentalId, status } = JSON.parse(msg.content.toString());
        await RentCar.findByIdAndUpdate(rentalId, { status });
        channel.ack(msg);
      },
      { noAck: false }
    );
    channel.consume(
      rabbitMQqueues.RENT_CAR_APPROVED_BY_CAR,
      async (msg) => {
        const { rentalId, status } = JSON.parse(msg.content.toString());
        await RentCar.findByIdAndUpdate(rentalId, { status });
        channel.ack(msg);
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Error publishing message:", error.message);
  }
};
