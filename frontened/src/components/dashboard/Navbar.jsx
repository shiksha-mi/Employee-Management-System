import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
   const { user, logout } = useAuth();
const navigate = useNavigate();
const handleLogout = () => {
  logout();
  navigate("/login");
};
  return (
    <div className="flex justify-between h-14 items-center bg-teal-600 text-white px-4">
        <p>Welcome {user.name}</p>
        <button
  onClick={handleLogout}
  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
>
  Logout
</button>
    </div>
  )
}

export default Navbar