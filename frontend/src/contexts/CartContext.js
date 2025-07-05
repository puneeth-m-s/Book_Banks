import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === book._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            _id: book._id,
            title: book.title,
            price: book.price,
            quantity: 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (bookId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== bookId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseQuantity = (bookId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === bookId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (bookId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item._id === bookId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
