import { createContext, useState } from "react";
import React from "react";

export const ProductContext = createContext(null);

export const ProductContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product to cart with quantity
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Remove one quantity of a product
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // remove if quantity 0
    );
  };

  // Update quantity manually
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id); // remove if 0
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  return (
    <ProductContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </ProductContext.Provider>
  );
};
