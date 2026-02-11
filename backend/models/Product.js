import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    rating: { 
      type: Number, 
      required: true, 
      min: 1, 
      max: 5 
    },
    comment: { 
      type: String, 
      trim: true 
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Product name is required"], 
      trim: true 
    },
    description: { 
      type: String, 
      trim: true 
    },
    price: { 
      type: Number, 
      required: function () { return this.isAvailableForSale; },
      min: [0, "Price cannot be negative"]
    },
    rentPrice: { 
      type: Number, 
      required: function () { return this.isAvailableForRent; },
      min: [0, "Rent price cannot be negative"]
    },
    category: { 
      type: String, 
      required: true, 
      trim: true,
      set: v => v.toLowerCase()
    },
    condition: { 
      type: String, 
      enum: ["new", "like-new", "used", "refurbished"], 
      default: "used" 
    },
    images: [{ 
      type: String, 
      validate: {
        validator: (v) => /^https?:\/\//.test(v) || v.startsWith("/uploads/"),
        message: "Image URL must be valid"
      } 
    }],
    owner: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    isAvailableForRent: { 
      type: Boolean, 
      default: true 
    },
    isAvailableForSale: { 
      type: Boolean, 
      default: true 
    },
    stock: { 
      type: Number, 
      default: 1, 
      min: [0, "Stock cannot be negative"]
    },
    location: {
      city: String,
      state: String,
      country: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "sold", "rented"],
      default: "active"
    },
    reviews: [reviewSchema],
    rating: { 
      type: Number, 
      default: 0, 
      min: 0, 
      max: 5 
    },
    numReviews: { 
      type: Number, 
      default: 0 
    }
  },
  { timestamps: true }
);

// Default image if none provided
productSchema.pre("save", function (next) {
  if (!this.images || this.images.length === 0) {
    this.images = ["/uploads/default-product.jpg"];
  }
  next();
});

// Virtual field for combined availability
productSchema.virtual("isAvailable").get(function () {
  return this.status === "active" && (this.isAvailableForSale || this.isAvailableForRent);
});

// Text index for searching
productSchema.index({
  name: "text",
  category: "text",
  description: "text",
  aiDescription: "text"
});
// Prevent duplicate product by same owner
productSchema.index({ name: 1, owner: 1 }, { unique: true });

export default mongoose.model("Product", productSchema);
