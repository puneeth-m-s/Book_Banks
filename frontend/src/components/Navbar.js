import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvatar(res.data.avatar);
      } catch {
        console.error("Failed to load avatar.");
      }
    };
    fetchAvatar();
  }, [token]);

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "#eee" }}>
      <Link to="/">Home</Link>
      {token ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/profile" style={{ marginRight: "1rem" }}>
            {avatar ? (
              <img
                src={`http://localhost:5000${avatar}`}
                alt="Avatar"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            ) : (
              <span style={{ fontSize: "1.5rem" }}>👤</span>
            )}
          </Link>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
