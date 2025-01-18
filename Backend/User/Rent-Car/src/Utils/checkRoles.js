import jwt from "jsonwebtoken";

export const verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return { verified: true, decoded };
  } catch (error) {
    return { verified: false, decoded: null };
  }
};
