import rabbitMQService from "./RabbitMQService.js";

export const publishMessage = async (queue, message) => {
  try {
    const channel = await rabbitMQService.getChannel();
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
  } catch (error) {
    console.error("Error publishing message to RabbitMQ:", error.message);
    throw new Error("Error publishing message to RabbitMQ");
  }
};
