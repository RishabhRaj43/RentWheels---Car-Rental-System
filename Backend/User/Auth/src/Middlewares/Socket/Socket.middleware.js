import jwt from "jsonwebtoken";
import env from "../../config/env/env.js";

export const socketMiddleware = async (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    next(new Error("Authentication error: Token not found"));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    socket.email = decoded.email;
    socket.userId = decoded.id;

    next();
  } catch (error) {
    next(new Error("Authentication error: Invalid token"));
  }
};
