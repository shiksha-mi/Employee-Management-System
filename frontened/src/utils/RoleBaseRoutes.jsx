import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  // Wait until authentication is checked
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Debugging (you can remove these later)
  console.log("User:", user);
  console.log("User Role:", user.role);
  console.log("Required Role:", requiredRole);

  // Check if user has the required role
  if (!requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  // User is authorized
  return children;
};

export default RoleBaseRoutes;