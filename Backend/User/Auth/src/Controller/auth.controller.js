import cache from "../cache/cache.js";
import User from "../Model/User.model.js";
import generateToken from "../utils/generateToken.js";
import bcryptjs from "bcryptjs";
import {
  loginValidation,
  registerValidation,
} from "../Validation/AuthValidation.js";

export const registerUser = async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existinguser = await User.findOne({ email: req.body.email });
    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const { password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 6);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    cache.set(user.email, user);
    const token = generateToken(user.email, res);

    return res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
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
    const token = generateToken(user.email, res);
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
    cache.del(req.email);
    return res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
