import Product from "../models/Product.js";


export const createProduct = async (req, res) => {
  try {
   
    const productData = {
      ...req.body,
      owner: req.user.id || req.user._id,  
    };

   
    const product = new Product(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("owner", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};