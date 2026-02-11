import { createContext, useEffect, useState } from "react";
import api from "../axiosInstance";

export const ProductContext = createContext(null);

export const ProductContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const removeFromCart = async (productId) => {
    try {
      const res = await api.delete(`/cart/${productId}`);
      setCart(res.data);
      return res.data;
    } catch (err) {
      console.error("Failed to remove from cart", err);
      throw err;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    const res = await api.put("/cart/update", {
      productId,
      quantity,
    });
    setCart(res.data);
  };

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setCart([]);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      const res = await api.post("/cart/add", {
        productId: product._id,
        quantity,
      });
      if (Array.isArray(res.data)) {
        setCart(res.data);
      } else {
        await fetchCart();
      }
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/wishlist");
      if (Array.isArray(res.data)) {
        setWishlist(res.data);
      }
      else{
        setWishlist([]);
      }
    } catch (err) {
      console.log(err);
      setWishlist([]);
    }
  };

  const toggleWishlist = async (product) => {
    console.log(product);
    try {
      const res = await api.post("/wishlist/toggle", {
        productId: product.product,
      });

      if (Array.isArray(res.data)) {
        setWishlist(res.data);
      } else {
        await fetchWishlist();
      }
    } catch (err) {
      console.error("Wishlist toggle failed", err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchCart();
      fetchWishlist();
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        wishlist,
        toggleWishlist,
        fetchCart,
        fetchWishlist,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
