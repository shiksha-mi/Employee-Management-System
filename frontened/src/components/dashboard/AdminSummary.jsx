import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminSummary = () => {
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setSummary(response.data);
        }
      } catch (error) {
        console.log(error);

        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Server Error");
        }
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-600">
            Total Employees
          </h3>

          <p className="text-4xl font-bold mt-3">
            {summary.totalEmployees}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-600">
            Total Departments
          </h3>

          <p className="text-4xl font-bold mt-3">
            {summary.totalDepartments}
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminSummary;