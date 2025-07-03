import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";



const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  const priceFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item) => (
              <li
                key={item.book._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "4px",
                }}
              >
                <h3>{item.book.title}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {priceFormatter.format(item.book.price)}</p>
                <p>
                  Subtotal:{" "}
                  {priceFormatter.format(item.book.price * item.quantity)}
                </p>
                <button
                  onClick={() => removeFromCart(item.book._id)}
                  style={{
                    padding: "0.5rem",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "0.5rem",
                  }}
                >
                  Remove One
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: {priceFormatter.format(totalPrice)}</h3>
          <button
            onClick={() => {
                clearCart();
                window.location.href = "/checkout-success";
            }}
            style={{
                padding: "0.5rem",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "1rem",
                marginLeft: "1rem",
            }}
            >
                Checkout
            </button>

          <button
            onClick={clearCart}
            style={{
              padding: "0.5rem",
              backgroundColor: "#6c757d",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
