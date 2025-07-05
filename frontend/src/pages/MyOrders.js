import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const MyOrders = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders/mine", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        alert("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p style={{ textAlign: "center" }}>You have no orders yet.</p>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>My Orders</h2>
      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h3>Order ID: {order._id}</h3>
          <p>Placed on: {new Date(order.createdAt).toLocaleString()}</p>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.title} × {item.quantity} — ₹{item.price}
              </li>
            ))}
          </ul>
          <p style={{ fontWeight: "bold" }}>Total: ₹{order.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
