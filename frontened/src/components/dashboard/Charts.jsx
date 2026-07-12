import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Charts = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/chart",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setDepartmentData(response.data.employeeByDepartment);
          setLeaveData(response.data.leaveStatus);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchChart();
  }, []);

  const barData = {
    labels: departmentData.map((item) => item.department),
    datasets: [
      {
        label: "Employees",
        data: departmentData.map((item) => item.total),
        backgroundColor: "#14b8a6",
      },
    ],
  };

  const pieData = {
    labels: leaveData.map((item) => item._id),
    datasets: [
      {
        data: leaveData.map((item) => item.total),
        backgroundColor: [
          "#22c55e",
          "#facc15",
          "#ef4444",
        ],
      },
    ],
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-10">

      <div className="bg-white p-5 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-5">
          Employees by Department
        </h3>

        <Bar data={barData} />
      </div>

      <div className="bg-white p-5 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-5">
          Leave Status
        </h3>

        <Pie data={pieData} />
      </div>

    </div>
  );
};

export default Charts;