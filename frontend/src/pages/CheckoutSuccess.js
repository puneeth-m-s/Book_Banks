import React from "react";

const CheckoutSuccess = () => {
  return (
    <div className="container" style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>🎉 Thank you for your purchase!</h2>
      <p>Your order has been placed successfully.</p>
      <a href="/" style={{ color: "#007bff", textDecoration: "underline" }}>
        Return to Home
      </a>
    </div>
  );
};

export default CheckoutSuccess;
