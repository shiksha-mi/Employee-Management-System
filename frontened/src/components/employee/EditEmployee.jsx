import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
  });

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployee();
    fetchDepartments();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/employee/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        const emp = response.data.employee;

        setEmployee({
          name: emp.userId.name,
          maritalStatus: emp.maritalStatus,
          designation: emp.designation,
          department: emp.department._id,
          salary: emp.salary,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/department",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setDepartments(response.data.departments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const response = await axios.put(
      `http://localhost:5000/api/employee/${id}`,
      employee,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      alert("Employee Updated Successfully");
      navigate("/admin-dashboard/employees");
    }
  } catch (error) {
    console.log(error);

    if (error.response) {
      alert(error.response.data.error);
    } else {
      alert("Server Error");
    }
  } finally {
    setLoading(false);
  }
};
return (
  <div className="flex items-center justify-center min-h-[90vh] bg-gray-100">
    <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">

      <h2 className="text-4xl font-bold text-center mb-8">
        Edit Employee
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Marital Status
          </label>

          <select
            name="maritalStatus"
            value={employee.maritalStatus}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          >
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Designation
          </label>

          <input
            type="text"
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Department
          </label>

          <select
            name="department"
            value={employee.department}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          >
            <option value="">Select Department</option>

            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.dep_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Salary
          </label>

          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white py-3 rounded hover:bg-teal-700"
        >
          {loading ? "Updating..." : "Update Employee"}
        </button>

      </form>

    </div>
  </div>
);

};

export default EditEmployee;