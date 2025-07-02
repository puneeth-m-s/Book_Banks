import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Home from "./pages/Home";
import { FaBook } from "react-icons/fa";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { isAuthenticated, logout } = useContext(AuthContext);

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
              alignItems: "center"
            }}
          >
            <FaBook size={24} style={{ marginRight: "0.5rem" }} />
            <span>Book Bank</span>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {!isAuthenticated && <Link to="/login">Login</Link>}
          {!isAuthenticated && <Link to="/register">Register</Link>}
          {isAuthenticated && (
            <button
              onClick={logout}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: "1rem"
              }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

// ✅ THIS IS THE MISSING LINE
export default App;

