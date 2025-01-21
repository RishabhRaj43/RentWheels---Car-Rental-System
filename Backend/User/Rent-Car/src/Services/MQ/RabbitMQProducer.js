import rabbitMQService from "./RabbitMQService.js";

export const publishMessage = async (queueName, message) => {
  try {
    const channel = await rabbitMQService.getChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
  } catch (error) {
    console.error("Error publishing message:", error.message);
  }
};
