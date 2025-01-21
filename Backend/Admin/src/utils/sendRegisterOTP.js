import rabbitMQService from "../Services/RabbitMQService.js";
import cache from "../Config/cache/cache.js";
import speakeasy from "speakeasy";
import rabbitMQqueues from "../Env/RabbitMQ/rabbitMQ.q.js";

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
    const channel = await rabbitMQService.getChannel();
    const queueName = rabbitMQqueues.REGISTER_OTP_QUEUE;
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
