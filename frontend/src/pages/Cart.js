import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const { token } = useContext(AuthContext);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item) => (
              <li
                key={item._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "1rem",
                  marginBottom: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h3>{item.title}</h3>
                  <p>Price: ₹{item.price}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      style={{
                        padding: "0.3rem 0.6rem",
                        fontSize: "1rem",
                        cursor: "pointer",
                      }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item._id)}
                      style={{
                        padding: "0.3rem 0.6rem",
                        fontSize: "1rem",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{
                      padding: "0.5rem",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div
            style={{
              textAlign: "right",
              fontWeight: "bold",
              fontSize: "1.2rem",
              marginTop: "1rem",
            }}
          >
            Total: ₹{totalPrice.toFixed(2)}
          </div>
          <div style={{ textAlign: "right", marginTop: "1rem" }}>
            <button
              onClick={clearCart}
              style={{
                padding: "0.5rem",
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "0.5rem",
              }}
            >
              Clear Cart
            </button>
            <button
              style={{
                padding: "0.5rem",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={async () => {
                if (!token) {
                  alert("You must be logged in to checkout.");
                  return;
                }

                try {
                  await axios.post(
                    "http://localhost:5000/api/orders",
                    {
                      items: cartItems.map((item) => ({
                        bookId: item._id,
                        title: item.title,
                        price: item.price,
                        quantity: item.quantity,
                      })),
                      total: totalPrice,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  clearCart();
                  window.location.href = "/checkout-success";
                } catch (err) {
                  console.error(err);
                  alert("Error placing order.");
                }
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
