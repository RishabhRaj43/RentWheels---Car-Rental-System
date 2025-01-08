import amqplib from "amqplib";
import env from "../Env/env.js";

export const connectRabbitMq = async () => {
  try {
    const connection = await amqplib.connect(env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    return channel;
  } catch (error) {
    console.log("Error connecting to RabbitMQ: ", error);
    throw error;
  }
};
