import mongoose, {Document, Schema} from "mongoose";

export interface IUser extends Document {
  email: string;
  name?: string;
  role: "customer" | "admin" | "seller";
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
  phone: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    name: {type: String, trim: true},
    role: {type: String, enum: ["customer", "admin","seller"], default: "customer"},
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    isVerified: {type: Boolean, default: false},
    otp: {type: String},
    otpExpiry: {type: Date},
    phone: {
  type: String,
  required: true,
  unique: true,
  match: /^\+?[1-9]\d{7,14}$/, 
}
  },
  {timestamps: true},
);

export default mongoose.model<IUser>("User", UserSchema);
