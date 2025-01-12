import { Server } from "socket.io";
import { socketMiddleware } from "../../Middlewares/Socket/Socket.middleware.js";

export let io;
const connectedSockets = new Map();

const socketConfig = (server) => {
  io = new Server(server, { cors: { origin: "*" } });

  io.use(socketMiddleware);

  io.on("connection", (socket) => {
    if (!socket.email && !socket.userId) return socket.disconnect();
    console.log("Socket connected");

    connectedSockets.set(socket.userId, socket);
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      connectedSockets.delete(socket.userId);
    });
  });
};

export default socketConfig;
