import { useParams } from "react-router-dom";
import { useContext, useState } from "react";

import { Heart, ShoppingBag } from "lucide-react";
import { ProductContext } from "../context/product-context";
import { fetchProducts } from "../features/auth/productSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, wishlist, toggleWishlist } = useContext(ProductContext);
  // const product = allProducts.find((p) => p.id === Number(id));
  // const product = useSelector((state) => selectProductById(state, id));
  const { list } = useSelector((state) => state.products);
  const product = list.find((p) => p._id === id || p.id == id);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, list.length]);
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // check if product is already in wishlist
  const inWishlist = wishlist.some((item) => item.id === product.id);
  if (!product) {
    return (
      <h2 className="text-center mt-10 text-red-600">Product not found</h2>
    );
  }
  return (
    <div className="p-8 max-w-xl md:max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image Section */}
      <div>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Details Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-300">{product.name}</h1>
        <p className="text-2xl text-yellow-400 mt-2">{product.price}</p>
        {product.offer && (
          <p className="text-rose-500 font-semibold">{product.offer}</p>
        )}

        <p className="mt-4 text-gray-300 leading-relaxed">
          {product.description || "No description available."}
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2 mt-4">
          <button
            className="px-3 py-2 mr-5 border-2 rounded text-gray-300 text-xl"
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          >
            -
          </button>
          <span className="text-gray-300 text-2xl">{quantity}</span>
          <button
            className="px-3 py-2 border-2 ml-5 rounded text-gray-300 text-xl"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6 items-center">
          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-purple-600 border-purple-600 hover:bg-purple-100"
          >
            <Heart className={inWishlist ? "fill-purple-500" : ""} />
          </button>

          {/* Add to Bag Button */}
          <button
            className={`px-4 py-2 rounded-lg ${
              added
                ? "bg-green-500 text-white"
                : "bg-purple-600 text-white hover:bg-purple-700"
            } shadow flex items-center gap-2`}
            onClick={handleAddToCart}
          >
            <ShoppingBag />
            {added ? "Added!" : `Add ${quantity} to Bag`}
          </button>

          {/* Buy Now Button */}
          <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 shadow">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
