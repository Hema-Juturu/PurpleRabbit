import mongoose from "mongoose";
import Product from "../models/Product.js"; 
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, required: true, enum: ["admin", "user"] },

    
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        type: {
          type: String,
          enum: ["buy", "rent"],
          required: true,
        },
        rentDuration: {
          type: Number, 
        },
      },
    ],

    
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
