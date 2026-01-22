import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const loginCore = async ({ email, password }, res) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User doesn't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error during Login." });
  }
};

export const register = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return loginCore({ email, password }, res);
  } catch (error) {
    console.error("Registration Error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "User already registered." });
    }
    return res
      .status(500)
      .json({ message: "Server error during registration." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  return loginCore({ email, password }, res);
};

export const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    httpOnly: true,
    maxAge: 0,
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully, token cookie cleared.",
  });
};

// ✅ Get logged in user
// router.get("/me", JwtService, async (req, res) => {
//   const user = await User.findById(req.user).select("-password");
//   res.json(user);
// });
