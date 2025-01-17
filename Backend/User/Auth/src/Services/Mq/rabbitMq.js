import amqplib from "amqplib";
import env from "../../config/env/env.js";

export let connection, channel;

export const connectRabbitMq = async () => {
  try {
    if (!connection) {
      connection = await amqplib.connect(env.RABBITMQ_URL);
    }
    channel = await connection.createChannel();
    console.log("RabbitMQ connected successfully");

    return { connection, channel };
  } catch (error) {
    throw new Error("Failed to connect to RabbitMQ");
  }
};

export const closeRabbitMq = async () => {
  try {
    if (connection) {
      await connection.close();
      console.log("RabbitMQ connection closed successfully");
    }
  } catch (error) {
    console.error("Error closing RabbitMQ connection:", error);
  }
};
