import User from "../models/User.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      status: "success",
      results: users.length,
      data: { users: users },
    });
  } catch (error) {
    console.error(error);
    next({ statusCode: 500, message: "Failed to fetch users." });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.query.id);

    if (!user) {
      return next({ statusCode: 404, message: "No user found with that ID." });
    }

    return res.status(200).json({ status: "success", data: { user: user } });
  } catch (error) {
    console.error(error);
    return next({ statusCode: 500, message: "Failed to fetch user." });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.query;
    const updates = req.body;

    if (!id) return res.status(400).json({ message: "Missing user id" });

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    return res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    return next({ statusCode: 500, message: "Failed to fetch user." });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "Missing user id" });

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    return next({ statusCode: 500, message: "Failed to delete user." });
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password -__v");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    return next({ statusCode: 500, message: "Failed to get profile." });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true, select: "-password -__v" }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: { user: updatedUser },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return next({ statusCode: 500, message: "Failed to update profile." });
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;

    // 1️⃣ Get user by ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3️⃣ Hash and save new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Update Password Error:", error);
    return next({ statusCode: 500, message: "Failed to update password." });
  }
};
