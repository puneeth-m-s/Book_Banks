import React, { createContext, useState, useEffect } from "react";

// Create the context object
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to store token
  const [token, setToken] = useState(null);

  // On component mount, check localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Helper to log in (save token)
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Helper to log out (remove token)
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
