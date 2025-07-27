<<<<<<< HEAD
import React, { createContext, useState, useEffect } from "react";
=======
// contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
>>>>>>> 1ab492634fd05fa351c1a29dad0f72afb59b8b1b

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
<<<<<<< HEAD
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined" && storedUser !== "") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
        setUser(null);
      }
    }
  }, []);

  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
=======
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // Fetch the user on initial load
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user", err);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  // This function can be called after uploading avatar
  const refreshUser = async () => {
    await fetchUser();
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsAuthenticated(true);
    fetchUser();
>>>>>>> 1ab492634fd05fa351c1a29dad0f72afb59b8b1b
  };

  const logout = () => {
    localStorage.removeItem("token");
<<<<<<< HEAD
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
=======
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
>>>>>>> 1ab492634fd05fa351c1a29dad0f72afb59b8b1b
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
<<<<<<< HEAD
        isAuthenticated: !!token,
        login,
        logout,
=======
        isAuthenticated,
        login,
        logout,
        refreshUser, // Expose this in context
>>>>>>> 1ab492634fd05fa351c1a29dad0f72afb59b8b1b
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
