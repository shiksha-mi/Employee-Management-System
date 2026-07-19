import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import {
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center h-16 bg-teal-600 px-6 text-white shadow-md">

      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold tracking-wide">
          Employee Management System
        </h1>
      </div>

      {/* User Profile */}
      <div className="relative">

        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 cursor-pointer select-none"
        >

          <img
            src={
              user?.profileImage
                ? `http://localhost:5000/uploads/${user.profileImage}`
                : "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="w-11 h-11 rounded-full border-2 border-white object-cover"
          />

          <div className="hidden md:block">
            <h3 className="font-semibold leading-5">
              {user?.name}
            </h3>

            <p className="text-xs capitalize text-gray-200">
              {user?.role}
            </p>
          </div>

          <FaChevronDown
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />

        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-2xl overflow-hidden z-50">

            <div className="px-5 py-4 border-b">

              <h3 className="font-bold text-gray-800">
                {user?.name}
              </h3>

              <p className="text-sm text-gray-500">
                {user?.email}
              </p>

              <p className="text-xs mt-1 capitalize text-teal-600 font-semibold">
                {user?.role}
              </p>

            </div>

            <Link
              to={`/${
                user?.role === "admin"
                  ? "admin-dashboard"
                  : "employee-dashboard"
              }/settings`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 text-gray-700 transition"
            >
              <FaCog />
              Settings
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-100 text-red-600 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>

          </div>
        )}

      </div>

    </div>
  );
};

export default Navbar;