import jwt from "jsonwebtoken";
import env from "../env/env.js";

const generateToken = (email, res) => {
  try {
    if(!env.JWT_SECRET){
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ email: email }, env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token_user", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none",
      secure: true,
    });

    return token;
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
    return error;
  }
};

export default generateToken;
