import { useParams } from "react-router-dom";
import {
  menProducts,
  womenProducts,
  kidsProducts,
  homeProducts,
} from "../data/productsData";

const allProducts = [
  ...menProducts,
  ...womenProducts,
  ...kidsProducts,
  ...homeProducts,
];
import { Heart, ShoppingBag } from "lucide-react";
const ProductDetails = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <h2 className="text-center mt-10 text-red-600">Product not found</h2>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image Section */}
      <div>
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Details Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-2xl text-purple-700 mt-2">{product.price}</p>
        {product.offer && (
          <p className="text-red-500 font-semibold">{product.offer}</p>
        )}

        <p className="mt-4 text-gray-600 leading-relaxed">
          {product.description || "No description available."}
        </p>

        <div className="flex gap-4 mt-6 items-center">
          {/* Wishlist Button */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-purple-600 border-purple-600 hover:bg-purple-100">
            <Heart />
          </button>

          {/* Add to Bag Button */}
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 shadow">
            <ShoppingBag />
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
