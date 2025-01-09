import amqplib from "amqplib";
import env from "../Env/env.js";

let channel, connection;

export const connectRabbitMq = async () => {
  try {
    connection = await amqplib.connect(env.RABBITMQ_URL);
    channel = await connection.createChannel();
    return channel;
  } catch (error) {
    console.log("Error connecting to RabbitMQ: ", error);
    throw error;
  }
};

export const publishMessage = async (queueName, message) => {
  try {
    if (!channel) await connectRabbitMq();
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });
    console.log("Message published to RabbitMQ successfully");
  } catch (error) {
    console.log("Error publishing message to RabbitMQ: ", error);
    throw error;
  }
};
