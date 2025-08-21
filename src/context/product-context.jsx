import { createContext, useState } from "react";
import React from "react";

// 1. Create the context
export const ProductContext = createContext(null);

// 2. Create the provider component
export const ProductContextProvider = ({ children }) => {
  // Cart state: an array of products
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Function to remove a product from the cart by id
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <ProductContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </ProductContext.Provider>
  );
};
