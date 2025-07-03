import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.book._id === book._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.book._id === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { book, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (bookId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.book._id === bookId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
