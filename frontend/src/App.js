import "./App.css";
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import { FaBook } from "react-icons/fa";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import MyOrders from "./pages/MyOrders";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  console.log("AuthContext user value:", user);

  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="logo">
          <Link
            to="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaBook size={24} style={{ marginRight: "0.5rem" }} />
            <span>Book Bank</span>
          </Link>
        </div>

        <div
          className="nav-links"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/my-orders">My Orders</Link>
          <Link to="/profile">Profile</Link>

          {isAuthenticated && user?.role === "admin" && (
            <Link to="/admin">Admin</Link>
          )}

          {!isAuthenticated && <Link to="/login">Login</Link>}
          {!isAuthenticated && <Link to="/register">Register</Link>}

          {isAuthenticated && (
            <>
              {/* Show avatar if available */}
              {user?.avatar ? (
                <img
                  src={`http://localhost:5000${user.avatar}`}
                  alt="avatar"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "1rem",
                  }}
                />
              ) : (
                <span
                  style={{
                    marginLeft: "1rem",
                    color: "#fff",
                    fontSize: "0.9rem",
                  }}
                >
                  No Avatar
                </span>
              )}

              <button
                onClick={logout}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginLeft: "1rem",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout-success"
          element={
            <ProtectedRoute>
              <CheckoutSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
