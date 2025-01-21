import app from "./src/App/app.js";
import { connectMongoDb } from "./src/Config/MongoDbConnect.js";
import env from "./src/Config/Env/env.js";
import { initSocket } from "./src/Config/Socket/SocketConfig.js";
import http from "http";
import rabbitMQService from "./src/Services/MQ/RabbitMQService.js";

const startServer = async () => {
  const server = http.createServer(app);
  await connectMongoDb();
  await rabbitMQService.connect();
  // initSocket(server);
  server.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}`);
  });
};

startServer();
