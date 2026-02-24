import User from "../models/User.js";

// export const toggleWishlist = async (req, res) => {
//   const { productId } = req.body;
//     if(!productId){
//         return res.status(400).json({ message: "Missing user id" });
//     }
//   const user = await User.findById(req.user.id);
//   const exists = user.wishlist.includes(productId);
//     if(!user){
//          return res.status(400).json({ message: "user not found" });
//     }
//   if (exists) {
//     user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
//   } else {
//     user.wishlist.push(productId);
//   }

//   await user.save();
//   res.json(user.wishlist);
// };
export const toggleWishlist = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert everything to string to ensure a proper comparison
    const exists = user.wishlist.some((id) => id.toString() === productId);

    if (exists) {
      // Remove product
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    } else {
      // Add product
      user.wishlist.push(productId);
    }

    // CRITICAL: Save the changes to the database
    await user.save();

    return res.status(200).json({
      message: exists ? "Removed from wishlist" : "Added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// export const getWishlist = async (req, res) => {
//   const user = await User.findById(req.user.id).populate("wishlist");
//   console.log(user.wishlist);
//   res.json(user.wishlist);
// };

export const getWishlist = async (req, res) => {
  try {
  
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error: error.message });
  }
};
