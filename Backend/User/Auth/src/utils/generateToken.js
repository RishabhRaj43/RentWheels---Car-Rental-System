import jwt from "jsonwebtoken";
import env from "../config/env/env.js";

const generateToken = ({ email, id }, res) => {
  try {
    if (!env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign(
      { email: email, id: id, role: "user" },
      env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token_user", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none",
      secure: true,
    });

    return token;
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: error.message });
  }
};

export default generateToken;
