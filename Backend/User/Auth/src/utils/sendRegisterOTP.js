import { connection, channel } from "../Services/Mq/rabbitMq.js";
import cache from "../cache/cache.js";
import env from "../env/env.js";
import speakeasy from "speakeasy";

export const generateOTP = async (email) => {
  const secret_key = speakeasy.generateSecret({ length: 20 }).base32;
  cache.set(`${email}_secret`, secret_key, 60 * 5);
  const otp = speakeasy.totp({
    secret: secret_key,
    encoding: "base32",
  });

  return otp;
};

export const sendRegisterOTP = async (email, otp) => {
  try {
    if (!connection) await connectRabbitMq();
    if (!channel) await connection.createChannel();
    const queueName = env.REGISTER_OTP_QUEUE;
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify({ email, otp })),
      { persistent: true }
    );
  } catch (error) {
    console.log("SendRegisterOTP Error: ", error);
    throw new Error("Error Sending Otp");
  }
};
