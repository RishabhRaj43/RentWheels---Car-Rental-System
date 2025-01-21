import env from "../Env/env.js";
import rabbitMQqueues from "../Env/RabbitMQ/rabbitMQ.q.js";
import rabbitMQService from "../Services/RabbitMQService.js";
import sendMail from "../utils/Mail/sendMail.js";

export const handleOTPVerification = async () => {
  try {
    const channel = await rabbitMQService.getChannel();
    const queueName = env.REGISTER_OTP_QUEUE;
    await channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, async (msg) => {
      if (msg) {
        const { email, otp } = JSON.parse(msg.content.toString());
        await sendMail(email, otp);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log("HandleOTPVerification Error: ", error.message);
    throw new Error(error.message);
  }
};
