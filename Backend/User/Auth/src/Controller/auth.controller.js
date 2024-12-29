import User from "../Model/User.model.js";
import { registerValidation } from "../Validation/AuthValidation.js";

export const registerUser = async (req, res) => {
  try {
    const { error, value } = registerValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.create(value);
    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const searchUser = async (req, res) => {
  try {
    const { key, value } = req.query;
    console.log(key, value);
    
    const user = await User.findOne({ [key]: value });
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
