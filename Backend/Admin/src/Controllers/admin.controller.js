import cache from "../Config/cache/cache.js";
import AdminModel from "../Models/Admin.model.js";
import { generateOTP, sendRegisterOTP } from "../utils/sendRegisterOTP.js";
import { registerAdminSchema } from "../Validation/admin.validation.js";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import generateToken from "../utils/generateToken.js";

export const registerAdmin = async (req, res) => {
  try {
    const { error } = registerAdminSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const cachedAdmin = cache.get(`${req.body.email}`);
    if (cachedAdmin) {
      return res.status(409).json({ error: "Admin already exists" });
    }

    const existingAdmin = await AdminModel.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.status(409).json({ error: "Admin already exists" });
    }

    req.body.password = await bcrypt.hash(req.body.password, 6);

    const admin = new AdminModel(req.body);
    // const otp = await generateOTP(admin.email);
    // await sendRegisterOTP(admin.email, otp);
    cache.set(admin.email, admin.toObject(), { ttl: 5 * 60 }); // 5 minutes
    res.status(201).json({ message: "Please verify your otp..." });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ error: "Error registering admin" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.query.email;
    const cachedAdmin = await cache.get(email);
    if (!cachedAdmin) {
      console.log("Cached admin not found");

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

    const admin = new AdminModel(cachedAdmin);
    admin.isVerified = true;
    const token = await generateToken(
      { email: admin.email, id: admin._id },
      res
    );
    cache.del(email);
    cache.del(`${email}_secret`);
    console.log("Admin verified successfully");

    await admin.save();
    return res
      .status(200)
      .json({ token, admin, message: "Admin registered successfully" });
  } catch (error) {
    console.log("Error in verifyOtp: ", error);
    return res.status(400).json({ message: error.message });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.query;
    const cachedAdmin = await cache.get(email);
    if (!cachedAdmin) {
      return res.status(400).json({ message: "Pls Signup Again" });
    }
    const otp = await generateOTP(email);
    await sendRegisterOTP(email, otp);
    return res.status(200).json({ message: "Otp sent successfully" });
  } catch (error) {
    console.log("Error in resendOtp: ", error);
    return res.status(400).json({ message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email: email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken({ email: admin.email, id: admin._id }, res);
    return res
      .status(200)
      .json({ token, admin, message: "Admin logged in successfully" });
  } catch (error) {
    console.error("Error in loginAdmin: ", error.message);
    return res.status(400).json({ message: error.message });
  }
};
