import React from "react";
import { useAuth } from "../../context/authContext";

const EmployeeSummary = () => {
  const { user } = useAuth();

  // Check what data is coming from AuthContext
  console.log("Logged-in User:", user);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Welcome, {user?.name}
      </h1>

      <p className="text-gray-600 mt-2">
        Employee Dashboard
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-gray-500">Department</h3>
          <p className="text-2xl font-bold mt-2">
            {user?.department || "N/A"}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-gray-500">Role</h3>
          <p className="text-2xl font-bold mt-2">
            {user?.role}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-gray-500">Email</h3>
          <p className="text-lg font-semibold mt-2 break-all">
            {user?.email}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-gray-500">Status</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            Active
          </p>
        </div>

      </div>
    </div>
  );
};

export default EmployeeSummary;