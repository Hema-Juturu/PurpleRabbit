import { useContext } from "react";
import { ProductContext } from "../context/product-context";
import { Heart, X } from "lucide-react";

const BagPage = () => {
  // ✅ Get cart and removeFromCart from context
  const { cart, removeFromCart } = useContext(ProductContext);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Bag</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your bag is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-4 border rounded-lg shadow"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-bold">{product.name}</h2>
                  <p className="text-purple-700">{product.price}</p>
                  {product.offer && (
                    <p className="text-red-500 text-sm">{product.offer}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-lg border text-purple-600 hover:bg-purple-100"
                  // Here you could add wishlist functionality
                >
                  <Heart />
                </button>
                <button
                  className="p-2 rounded-lg border text-red-600 hover:bg-red-100"
                  onClick={() => removeFromCart(product.id)}
                >
                  <X />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BagPage;
