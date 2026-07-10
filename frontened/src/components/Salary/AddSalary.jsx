import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSalary = () => {
  const [salary, setSalary] = useState({
  employeeId: "",
  basicSalary: "",
  allowances: "",
  deductions: "",
  payDate: "",
});

const [employees, setEmployees] = useState([]);

useEffect(() => {
  console.log("AddSalary useEffect is running");

  const fetchEmployees = async () => {
    console.log("Fetching employees...");
     console.log("Token:", token);

    try {
      const token = localStorage.getItem("token");
     

      const response = await axios.get(
        "http://localhost:5000/api/employee",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data.success) {
        console.log("Employees:", response.data.employees);
        setEmployees(response.data.employees);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  fetchEmployees();
}, []);

  const handleChange = (e) => {
    setSalary({
      ...salary,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:5000/api/salary/add",
      salary,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      alert("Salary Added Successfully");
      navigate("/admin-dashboard/salary");
    }
  } catch (error) {
    console.log(error);
    alert(error.response?.data?.error || "Something went wrong");
  }
};

  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-600">
  THIS IS MY NEW ADD SALARY PAGE
</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block mb-2 font-semibold">
            Employee
          </label>

          <select
  name="employeeId"
  value={salary.employeeId}
  onChange={handleChange}
  className="w-full border rounded-lg px-3 py-2"
>
  <option value="">Select Employee</option>

  {employees.map((emp) => (
    <option key={emp._id} value={emp._id}>
      {emp.userId.name}
    </option>
  ))}
</select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Basic Salary
          </label>

          <input
            type="number"
            name="basicSalary"
            value={salary.basicSalary}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Allowances
          </label>

          <input
            type="number"
            name="allowances"
            value={salary.allowances}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Deductions
          </label>

          <input
            type="number"
            name="deductions"
            value={salary.deductions}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Pay Date
          </label>

          <input
            type="date"
            name="payDate"
            value={salary.payDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg"
        >
          Add Salary
        </button>

      </form>
    </div>
  );
};

export default AddSalary;