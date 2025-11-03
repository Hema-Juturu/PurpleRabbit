import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    // const safeUsers = users.map(filterUser);
    return res
      .status(200)
      .json({
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
            return next({ statusCode: 404, message: 'No user found with that ID.' });
        }
        
        return res.status(200).json({ status: 'success', data: { user: user } });
    } catch (error) {
        console.error(error);
        return next({ statusCode: 500, message: 'Failed to fetch user.' });
    }
};

export const updateUser = async (req, res,next) => {
  try {
    const { id } = req.query; 
    const updates = req.body; 
    
    if (!id) return res.status(400).json({ message: "Missing user id" });

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    return res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {

     return next({ statusCode: 500, message: 'Failed to fetch user.' });
  }
};

export const deleteUser = async (req, res,next) => {
  try {
    const { id } = req.query; 
    if (!id) return res.status(400).json({ message: "Missing user id" });

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    return res.json({ message: "User deleted successfully" });
  } catch (err) {
     return next({ statusCode: 500, message: 'Failed to delete user.' });
  }
};

