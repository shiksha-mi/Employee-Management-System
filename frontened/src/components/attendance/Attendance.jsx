import React, { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({
    employeeId: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/employee",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setEmployees(response.data.employees);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setAttendance({
      ...attendance,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/attendance/mark",
        attendance,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(response.data.message);

      setAttendance({
        employeeId: "",
        date: "",
        status: "Present",
      });

    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Mark Attendance
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <select
          name="employeeId"
          value={attendance.employeeId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Employee</option>

          {employees.map((employee) => (
            <option
              key={employee._id}
              value={employee._id}
            >
              {employee.userId?.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={attendance.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="status"
          value={attendance.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button
          className="bg-teal-600 text-white px-6 py-2 rounded"
        >
          Mark Attendance
        </button>
      </form>
    </div>
  );
};

export default Attendance;