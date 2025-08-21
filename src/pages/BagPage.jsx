import { useContext } from "react";
import { ProductContext } from "../context/product-context";
import { Heart, X } from "lucide-react";

const BagPage = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(ProductContext);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Bag</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your bag is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg shadow gap-4"
            >
              {/* Product Info */}
              <div className="flex items-start gap-4 w-full md:w-auto">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-24 h-24 md:w-20 md:h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="font-bold">{product.name}</h2>
                  <p className="text-purple-700">{product.price}</p>
                  {product.offer && (
                    <p className="text-red-500 text-sm">{product.offer}</p>
                  )}
                </div>
              </div>

              {/* Actions in same row */}
              <div className="flex items-center justify-end gap-2 w-full md:w-auto mt-2 md:mt-0">
                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() =>
                      updateQuantity(product.id, product.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <p className="px-2">{product.quantity}</p>
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() =>
                      updateQuantity(product.id, product.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                {/* Wishlist & Remove Buttons */}
                <button className="p-2 rounded-lg border text-purple-600 hover:bg-purple-100">
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
