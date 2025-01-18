import jwt from "jsonwebtoken";
import env from "../Env/env.js";

export const verifyToken = (token, role, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return { verified: true, decoded };
  } catch (error) {
    return { verified: false, decoded: null };
  }
};
