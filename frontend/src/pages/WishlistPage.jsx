import { useContext } from "react";
import { ProductContext } from "../context/product-context";
import { ShoppingBag, X } from "lucide-react";

const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToCart, cart } =
    useContext(ProductContext);
  const handleCart = (product)=>{
    addToCart(product,1);
    toggleWishlist(product);
  }
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty </p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className=" bg-white/30 flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg shadow gap-4"
            >
              {/* Product Info */}
              <div className="flex items-start gap-4 w-full md:w-auto">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-24 h-24 md:w-20 md:h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="font-bold">{product.name}</h2>
                  <p className="text-purple-700">{product.price}</p>
                  {product.offer && (
                    <p className="text-red-500 text-sm ">{product.offer}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 w-full md:w-auto mt-2 md:mt-0">
                {/* Move to Cart */}
                <button
                  className={`${
                    cart.some((item) => item.id === product.id)
                      ? "hidden "
                      : ""
                  } p-2 rounded-lg border bg-purple-50 text-purple-600 flex items-center gap-1`}
                  onClick={() => handleCart(product, 1)}
                >
                  <ShoppingBag className={`w-4 h-4`} />
                  Move to Bag
                </button>

                {/* Remove */}
                {/* <button
                  className="p-2 rounded-lg border text-red-600 hover:bg-red-600 hover:text-white bg-white"
                  onClick={() => toggleWishlist(product)}
                >
                  <X />
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
