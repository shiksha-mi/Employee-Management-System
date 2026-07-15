import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#14b8a6", "#3b82f6", "#ef4444", "#f59e0b"];

const Charts = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    fetchCharts();
  }, []);

  const fetchCharts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/charts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setDepartmentData(response.data.employeeByDepartment);

        setLeaveData(
          response.data.leaveStatus.map((item) => ({
            name: item._id,
            value: item.total,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-xl font-bold mb-4">
          Employees by Department
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={departmentData}
              dataKey="total"
              nameKey="department"
              outerRadius={100}
              label
            >
              {departmentData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-xl font-bold mb-4">
          Leave Status
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={leaveData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {leaveData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Charts;