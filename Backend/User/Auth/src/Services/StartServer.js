import connectDB from "../DB/ConnectDB.js";
import http from "http";
import env from "../config/env/env.js";
import startBackGroundJobs from "../Handler/StartBackGroundJobs.js";
import { connectRabbitMq } from "./Mq/rabbitMq.js";
import socketConfig, { io } from "../config/Socket/SocketConfig.js";

const startServer = async (app) => {
  try {
    const server = http.createServer(app);
    await connectDB();
    await connectRabbitMq();
    await startBackGroundJobs();
    socketConfig(server);
    server.listen(env.USER_AUTH_PORT, () => {
      console.log(`Server running on port ${env.USER_AUTH_PORT}`);
    });
  } catch (error) {
    console.log("Error connecting to RabbitMQ or database:", error.message);
    setTimeout(startServer, 5000);
  }
};

export default startServer;
