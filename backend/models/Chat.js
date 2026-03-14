import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
    expires: "30d",
  },
});

export default mongoose.model("Chat", chatSchema);