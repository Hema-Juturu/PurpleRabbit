import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }
    const result = await authService.sendOtp(email);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      res.status(400).json({ message: 'Email and OTP are required' });
      return;
    }
    const result = await authService.verifyOtp(email, otp);
    res.json(result);
  } catch (err) {
    next(err);
  }
};