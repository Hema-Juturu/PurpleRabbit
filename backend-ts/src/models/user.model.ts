import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name?: string;
  role: 'customer' | 'admin';
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  isVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String, trim: true },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiry: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);