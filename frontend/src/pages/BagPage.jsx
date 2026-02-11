import { useContext } from "react";
import { ProductContext } from "../context/product-context";
import { Heart, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectCart } from "../features/bagSlice";
import { fetchCart } from "../features/bagSlice";
import { fetchWishlist } from "../features/bagSlice";
import { selectCartProducts } from "../features/bagSlice";
import { removeFromCart } from "../features/bagSlice";
import { toggleWishlist } from "../features/bagSlice";
import { selectWishlist } from "../features/bagSlice";

const BagPage = () => {
  const wishlist = useSelector(selectWishlist);
  const handleWishlist = async(product) => {
     await dispatch(toggleWishlist(product._id));
     await dispatch(removeFromCart(product._id));
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, []);
  const cart = useSelector(selectCart);
  const fullc = useSelector(selectCartProducts);
  console.log("fullcart", fullc);
  const handleRmCart = (id) => {
    console.log("id",id);
    dispatch(removeFromCart(id));
  };
   const handleupdateQuantity = (id,q) => {
    dispatch(updateQuantity({id,q}));
  };
  let total = 0;
  if (cart.length) {
    cart.forEach((p) => {
      // console.log(p);
      total += p.price * p.quantity;
    });
  }
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Bag</h1>

      {fullc.length === 0 ? (
        <p className="text-gray-500">Your bag is empty.</p>
      ) : (
        <div className="space-y-4">
          {fullc.map((product) => (
            <div
              key={product._id}
              className="bg-white/30 flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg shadow gap-4"
            >
              {/* Product Info */}
              <div className="flex items-start gap-4 w-full md:w-auto">
                <img
                  src={product.images?.[0]}
                  alt={product?.name}
                  className="w-24 h-24 md:w-20 md:h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="font-bold">{product?.name}</h2>
                  <p className="text-purple-700">{product?.price}</p>
                  {product.offer && (
                    <p className="text-red-500 text-sm">{product?.offer}</p>
                  )}
                </div>
              </div>

              {/* Actions in same row */}
              <div className="flex items-center justify-end gap-6 w-full md:w-auto mt-2 md:mt-0 ">
                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 border rounded bg-white "
                    onClick={() =>
                      handleupdateQuantity(product._id, product.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <p className="px-2 text-2xl text-white">{product.quantity}</p>
                  <button
                    className="px-2 py-1 border rounded bg-white "
                    onClick={() =>
                      handleupdateQuantity(product._id, product.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                {/* Wishlist & Remove Buttons */}
                <button
                  className="p-2 rounded-lg border text-purple-600  hover:bg-purple-600 bg-white"
                  onClick={() => handleWishlist(product)}
                >
                  <Heart
                    className={
                      wishlist.some((item) => item.id === product._id)
                        ? "fill-red-600"
                        : "fill-white"
                    }
                  />
                </button>
                <button
                  className="p-2 bg-white rounded-lg border text-red-600  hover:bg-red-600 hover:text-white"
                  onClick={() => handleRmCart(product._id)}
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
