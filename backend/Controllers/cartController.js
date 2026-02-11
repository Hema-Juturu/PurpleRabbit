import User from "../models/User.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const user = await User.findById(req.user.id);

    const itemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex > -1) {
      user.cart[itemIndex].quantity = quantity;

      user.markModified("cart");
    } else {
      user.cart.push({
        product: productId,
        quantity,
        type: "buy",
      });
    }

    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCart = async (req, res) => {
  const user = await User.findById(req.user.id).populate("cart.product");

  res.json(user.cart || []);
};

export const updateCartItem = async (req, res) => {
  const { productId, quantity, rentDuration } = req.body;

  const user = await User.findById(req.user.id);

  const item = user.cart.find((i) => i._id.toString() === productId);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  if (quantity !== undefined) item.quantity = quantity;
  if (rentDuration !== undefined) item.rentDuration = rentDuration;

  await user.save();
  res.json(user.cart || []);
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user.id);

    
    user.cart = user.cart.filter(
      (item) =>
        item.product.toString() !== productId &&
        item._id.toString() !== productId,
    );

    await user.save();

   
    res.json(user.cart || []);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
