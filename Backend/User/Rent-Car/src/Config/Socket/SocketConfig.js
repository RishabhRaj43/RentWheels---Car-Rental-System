import { Server } from "socket.io";
import { socketMiddleware } from "../../Middlewares/Socket/Socket.middleware.js";

export let io;
const connectSocket = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:8011",
      credentials: true,
    },
  });

  io.use(socketMiddleware);

  io.on("connection", (socket) => {
    if (!socket.userEmail && !socket.userId) return socket.disconnect(true);
    console.log(`User connected: ${socket.userEmail}`);
    connectSocket.set(socket.userId, socket);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.userEmail}`);
      connectSocket.delete(socket.userId);
    });
  });
};
