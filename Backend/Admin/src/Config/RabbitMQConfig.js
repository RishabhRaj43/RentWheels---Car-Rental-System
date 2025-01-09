import ampqlib from "amqplib";
import env from "../Env/env.js";

export let connection, channel;

export const connectRabbitMQ = async () => {
  try {
    connection = await ampqlib.connect(env.RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");
    
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
};

