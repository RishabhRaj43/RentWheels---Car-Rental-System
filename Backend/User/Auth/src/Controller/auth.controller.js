import cache from "../config/cache/cache.js";
import User from "../Model/User.model.js";
import generateToken from "../utils/generateToken.js";
import bcryptjs from "bcryptjs";
import {
  loginValidation,
  registerValidation,
  updateValidation,
} from "../Validation/AuthValidation.js";
import { generateOTP, sendRegisterOTP } from "../utils/sendRegisterOTP.js";
import speakeasy from "speakeasy";

export const registerUser = async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const cachedUser = await cache.get(req.body.email);
    if (cachedUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const existinguser = await User.findOne({ email: req.body.email });
    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }

    req.body.password = await bcryptjs.hash(req.body.password, 6);

    const user = new User(req.body);
    cache.set(user.email, { ...user.toObject() }, 60 * 5); // 5 minutes

    return res.status(200).json({ message: "OTP has been sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.query.email;
    const cachedUser = await cache.get(email);
    if (!cachedUser) {
      return res.status(400).json({ message: "Pls Signup Again" });
    }
    const secret = cache.get(`${email}_secret`);
    if (!secret) {
      return res
        .status(400)
        .json({ message: "OTP has expired. Pls signup again" });
    }
    const isVerified = speakeasy.totp.verify({
      secret: secret,
      encoding: "base32",
      token: otp,
      window: 10,
    });
    if (!isVerified) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = new User(cachedUser);
    await user.save();
    const token = generateToken({ email: user.email, id: user._id }, res);
    cache.del(email);
    cache.del(`${email}_secret`);
    return res
      .status(200)
      .json({ token, user, message: "User registered successfully" });
  } catch (error) {
    console.log("Error in verifyOtp: ", error);
    return res.status(400).json({ message: error.message });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const email = req.query.email;
    const cachedUser = await cache.get(email);
    if (!cachedUser) {
      return res.status(400).json({ message: "Pls Signup Again" });
    }
    const otp = await generateOTP(cachedUser.email);
    await sendRegisterOTP(cachedUser.email, otp);
    cache.set(email, { ...cachedUser, otp }, 60 * 5); // 5 minutes
    return res.status(200).json({ message: "OTP has been sent successfully" });
  } catch (error) {
    console.error("Error in resendOtp:", error.message);
    return res.status(400).json({ message: error.message });
  }
};

export const searchUser = async (req, res) => {
  try {
    const { key, value } = req.query;
    const cachedUser = cache.get(key);
    if (cachedUser) {
      return res.status(200).json({ user: cachedUser });
    }

    console.log(key, value);

    const user = await User.findOne({ [key]: value });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!cachedUser) {
      cache.set(key, user);
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email: ", email, "Password: ", password);

    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = generateToken({ email: user.email, id: user._id }, res);
    const cachedUser = cache.get(user.email);
    if (!cachedUser) {
      cache.set(user.email, user);
    }
    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token_user");
    return res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (req.file) {
      req.body.avatar = `${req.protocol}://${req.get("host")}/src/uploads/${
        req.file.filename
      }`;
    }
    const { error } = updateValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (req.body.password) {
      const hashedPassword = await bcryptjs.hash(req.body.password, 6);
      req.body.password = hashedPassword;
    }

    const userEmail = req.email;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      req.body,
      { new: true }
    );
    let token;
    if (req.body.email && req.body.email !== userEmail) {
      token = generateToken(updatedUser.email, res);
    }
    cache.set(user.email, updatedUser);
    return res.status(200).json({ user: updatedUser, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
