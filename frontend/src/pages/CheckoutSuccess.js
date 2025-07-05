import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>🎉 Thank you for your purchase!</h2>
      <p>Your order has been placed successfully.</p>
      <p>You will receive an email confirmation shortly.</p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default CheckoutSuccess;
