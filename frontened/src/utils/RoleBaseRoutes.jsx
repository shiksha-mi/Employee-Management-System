import React from 'react'
import { useAuth } from "../context/authContext";
import { Navigate } from 'react-router-dom';

const RoleBaseRoutes = ({ children , requiredRole }) => {
    const { user , loading } = useAuth();

    if (loading) {
      return <div>Loading...</div>; // Show a loading indicator while checking authentication
    }

    if(!requiredRole.includes(user.role)){
  return <Navigate to = "/unauthorized"/>// Render children if authenticated, otherwise show access denied message
}

    return user ? children : <Navigate to = "/login"/>// Render children if authenticated, otherwise show access denied message}
}

export default RoleBaseRoutes