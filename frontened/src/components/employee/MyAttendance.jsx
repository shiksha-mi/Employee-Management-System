import React, { useEffect, useState } from "react";
import axios from "axios";

const MyAttendance = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/attendance/my-attendance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setAttendance(response.data.attendance);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const totalDays = attendance.length;
  const presentDays = attendance.filter(
    (item) => item.status === "Present"
  ).length;

  const percentage =
    totalDays > 0
      ? ((presentDays / totalDays) * 100).toFixed(2)
      : 0;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Attendance</h2>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <p><strong>Total Days:</strong> {totalDays}</p>
        <p><strong>Present:</strong> {presentDays}</p>
        <p><strong>Attendance:</strong> {percentage}%</p>
      </div>

      <table className="w-full border-collapse bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((item) => (
            <tr key={item._id}>
              <td className="border p-3">
                {new Date(item.date).toLocaleDateString()}
              </td>

              <td
                className={`border p-3 font-semibold ${
                  item.status === "Present"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAttendance;