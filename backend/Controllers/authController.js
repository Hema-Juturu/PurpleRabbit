import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const register = async (req, res) => {
  try {
    // ✅ START the try block
    const { name, password, email, role } = req.body;

    // 1. Check for existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create and save new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: `User registered with name ${name}` });
  } catch (error) {
    // ✅ Handle any error that occurred in the 'try' block
    console.error("Registration Error:", error);
    // Send a generic 500 status for any server/database failure
    res.status(500).json({ message: "Server error during registration." });
  }
};

// ✅ Login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ msg: "User doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    // ✅ Handle any error that occurred in the 'try' block
    console.error("Registration Error:", error);
    // Send a generic 500 status for any server/database failure
    res.status(500).json({ message: "Server error during registration." });
  }
};

// ✅ Get logged in user
// router.get("/me", JwtService, async (req, res) => {
//   const user = await User.findById(req.user).select("-password");
//   res.json(user);
// });
