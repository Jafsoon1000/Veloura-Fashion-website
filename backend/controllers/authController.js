import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import OtpCode from "../models/OtpCode.js";
import User from "../models/User.js";
import { sendOtpSms } from "../utils/sendOtp.js";

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function register(req, res) {
  try {
    const { name, email, password, phoneNumber } = req.body;
    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existing = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existing) return res.status(400).json({ error: "Email or phone already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber
    });

    return res.status(201).json({
      message: "Registered successfully. Verify your phone to activate account.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isPhoneVerified: user.isPhoneVerified
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error during registration." });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials." });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials." });

    const token = generateToken(user._id);
    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isPhoneVerified: user.isPhoneVerified
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error during login." });
  }
}

export async function sendOtp(req, res) {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) return res.status(400).json({ error: "Phone number is required." });

    const code = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await OtpCode.deleteMany({ phoneNumber });
    await OtpCode.create({ phoneNumber, code, expiresAt });
    const status = await sendOtpSms(phoneNumber, code);

    return res.json({
      message: "OTP sent successfully.",
      ...(status.mode === "dev" ? { debugOtp: code } : {})
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send OTP." });
  }
}

export async function verifyPhone(req, res) {
  try {
    const { phoneNumber, code } = req.body;
    if (!phoneNumber || !code) {
      return res.status(400).json({ error: "Phone number and code are required." });
    }

    const otpRecord = await OtpCode.findOne({ phoneNumber, code });
    if (!otpRecord) return res.status(400).json({ error: "Invalid OTP." });
    if (otpRecord.expiresAt < new Date()) {
      await OtpCode.deleteMany({ phoneNumber });
      return res.status(400).json({ error: "OTP expired. Request a new code." });
    }

    const user = await User.findOneAndUpdate(
      { phoneNumber },
      { isPhoneVerified: true },
      { new: true }
    ).select("-password");
    await OtpCode.deleteMany({ phoneNumber });

    if (!user) return res.status(404).json({ error: "User not found for this phone number." });

    return res.json({
      message: "Phone number verified.",
      user
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to verify phone." });
  }
}

export async function me(req, res) {
  return res.json({ user: req.user });
}
