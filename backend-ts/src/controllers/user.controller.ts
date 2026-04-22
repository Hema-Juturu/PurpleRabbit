import { Request ,Response} from "express";
import User from '../models/user.model';
import { JwtPayload } from "jsonwebtoken";

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as JwtPayload).id;  
    const user = await User.findById(userId).select('-otp -otpExpiry');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('getMe error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateMe = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as JwtPayload).id;
    const { name, phone, address } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, phone, address },
      { new: true, runValidators: true }
    ).select('-otp -otpExpiry');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('updateMe error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};