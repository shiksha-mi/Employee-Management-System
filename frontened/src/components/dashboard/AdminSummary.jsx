import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryCard from "./SummaryCard";
import Charts from "./Charts";

import {
  FaUsers,
  FaBuilding,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const AdminSummary = () => {
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    totalSalaryRecords: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
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
        console.log("Summary Error:", error.response?.data || error.message);
      }
    };

    

    fetchSummary();
    
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-blue-600"
        />

        <SummaryCard
          icon={<FaBuilding />}
          text="Departments"
          number={summary.totalDepartments}
          color="bg-green-600"
        />

        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Salary Records"
          number={summary.totalSalaryRecords}
          color="bg-purple-600"
        />

        <SummaryCard
          icon={<FaClock />}
          text="Pending Leaves"
          number={summary.pendingLeaves}
          color="bg-yellow-500"
        />

        <SummaryCard
          icon={<FaCheckCircle />}
          text="Approved Leaves"
          number={summary.approvedLeaves}
          color="bg-emerald-600"
        />

        <SummaryCard
          icon={<FaTimesCircle />}
          text="Rejected Leaves"
          number={summary.rejectedLeaves}
          color="bg-red-600"
        />

      </div>
      <Charts />
    </div>
   
  );
};

export default AdminSummary;