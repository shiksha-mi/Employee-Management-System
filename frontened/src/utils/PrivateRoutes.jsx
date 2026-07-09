import React from 'react'
import { useAuth } from "../context/authContext";
import { Navigate } from 'react-router-dom';


const PrivateRoutes = ({children}) => {
    const { user, loading } = useAuth();
  
    if (loading) {
      return <div>Loading...</div>; // Show a loading indicator while checking authentication
    }

    return user ? children : <Navigate to = "/login"/>// Render children if authenticated, otherwise show access denied message
}

export default PrivateRoutes