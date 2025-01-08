import connectDB from "../DB/ConnectDB.js";
import env from "../env/env.js";
import startBackGroundJobs from "../Events/StartBackGroundJobs.js";
import { connectRabbitMq } from "./Mq/rabbitMq.js";

const startServer = async (app) => {
  try {
    await connectDB();
    await connectRabbitMq();
    await startBackGroundJobs();
    console.log("RabbitMQ connected successfully");
    app.listen(env.USER_AUTH_PORT, () => {
      console.log(`Server is running on port ${env.USER_AUTH_PORT}`);
    });
  } catch (error) {
    console.log("Error connecting to RabbitMQ or database:", error.message);
    setTimeout(startServer, 5000);
  }
};

export default startServer;
