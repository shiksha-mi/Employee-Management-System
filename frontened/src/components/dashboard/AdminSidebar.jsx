import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCog,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 w-64">
      <div className="bg-teal-600 h-14 flex items-center justify-center">
        <h3 className="text-2xl text-center font-pacific">
          Employee MS
        </h3>
      </div>

      <div className="px-4 py-4">

        {/* Dashboard */}
        <NavLink
          to="/admin-dashboard"
          end
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        {/* Employees */}
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaUsers />
          <span>Employees</span>
        </NavLink>

        {/* Departments */}
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaBuilding />
          <span>Departments</span>
        </NavLink>

        {/* Leaves */}
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>

        {/* Salary */}
        <NavLink
          to="/admin-dashboard/salary"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/admin-dashboard/settings"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-600" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>

      </div>
    </div>
  );
};

export default AdminSidebar;