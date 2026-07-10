import React, { useEffect, useState } from "react";
import axios from "axios";

const AddLeave = () => {
  const [employees, setEmployees] = useState([]);

  const [leave, setLeave] = useState({
    employeeId: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    description: "",
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
    setLeave({
      ...leave,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:5000/api/leave/add",
      leave,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      alert("Leave Applied Successfully");
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
return (
  <div className="flex justify-center items-center min-h-[90vh] bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">

      <h2 className="text-3xl font-bold text-center mb-8">
        Apply Leave
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label className="block mb-2">Employee</label>

          <select
            name="employeeId"
            value={leave.employeeId}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          >
            <option value="">Select Employee</option>

            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.userId.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Leave Type</label>

          <select
            name="leaveType"
            value={leave.leaveType}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          >
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">From Date</label>

          <input
            type="date"
            name="fromDate"
            value={leave.fromDate}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">To Date</label>

          <input
            type="date"
            name="toDate"
            value={leave.toDate}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2">Description</label>

          <textarea
            name="description"
            rows="4"
            value={leave.description}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded hover:bg-teal-700"
        >
          Apply Leave
        </button>

      </form>

    </div>
  </div>
);
};

export default AddLeave;