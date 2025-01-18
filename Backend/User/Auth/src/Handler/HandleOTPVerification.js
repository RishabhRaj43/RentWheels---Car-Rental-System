import env from "../config/env/env.js";
import { connection, connectRabbitMq } from "../Services/Mq/rabbitMq.js";
import sendMail from "../utils/Mail/sendMail.js";

export const handleOTPVerification = async () => {
  try {
    if (!connection) {
      connection = await connectRabbitMq();
    }
    const channel = await connection.createChannel();
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
    console.log("HandleOTPVerification Error: ", error);
    // throw new Error("Error Handling OTP Verification");
  }
};
