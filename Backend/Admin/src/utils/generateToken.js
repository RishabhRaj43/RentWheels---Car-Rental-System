import jwt from "jsonwebtoken";
import env from "../Env/env.js";

const generateToken = ({ email, id }, res) => {
  try {
    if (!env.JWT_ADMIN_SECRET) {
      throw new Error("JWT_ADMIN_SECRET is not defined");
    }
    const token = jwt.sign({ email: email, id: id }, env.JWT_ADMIN_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token_admin", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none",
      secure: true,
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    res.status(401).json({ message: error.message });
    throw new Error("Error generating token");
  }
};

export default generateToken;
