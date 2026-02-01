import User from "../models/User.js";

export const toggleWishlist = async (req, res) => {
  const { productId } = req.body;
  console.log(productId);
    if(!productId){
        return res.status(400).json({ message: "Missing user id" });
    }
  const user = await User.findById(req.user.id);
  const exists = user.wishlist.includes(productId);
    if(!user){
         return res.status(400).json({ message: "user not found" });
    }
  if (exists) {
    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
  } else {
    user.wishlist.push(productId);
  }

  await user.save();
  res.json(user.wishlist);
};

export const getWishlist = async (req, res) => {
  const user = await User.findById(req.user.id).populate("wishlist");

  res.json(user.wishlist);
};
