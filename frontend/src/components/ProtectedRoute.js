import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useContext(AuthContext);

  console.log("ProtectedRoute: isAuthenticated =", isAuthenticated);
  console.log("ProtectedRoute: token =", token);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
