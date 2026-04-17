import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transporter from '../config/mailer';
import "dotenv/config";

export const sendOtp = async (email: string) => {
    console.log('Sending OTP to:', email);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  await User.findOneAndUpdate(
    { email },
    { email, otp: hashedOtp, otpExpiry, isVerified: false },
    { upsert: true,  returnDocument: "after" }
  );
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP',
    text: `Your OTP is ${otp}. Valid for 5 minutes.`,
  });

  return { message: 'OTP sent to email' };
};

export const verifyOtp = async (email: string, otp: string) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error('User not found');
  if (!user.otp || !user.otpExpiry) throw new Error('OTP not requested');
  if (user.otpExpiry < new Date()) throw new Error('OTP expired');

  const isMatch = await bcrypt.compare(otp, user.otp);
  if (!isMatch) throw new Error('Invalid OTP');

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );

  return { token, user: { id: user._id, email: user.email, role: user.role } };
};