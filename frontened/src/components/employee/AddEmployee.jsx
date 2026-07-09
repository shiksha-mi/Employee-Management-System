import React, { useEffect, useState } from "react";
import axios from "axios";

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    employeeId: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
    password: "",
    role: "employee",
    image: null,
  });

  useEffect(() => {
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

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setEmployee({
        ...employee,
        image: files[0],
      });
    } else {
      setEmployee({
        ...employee,
        [name]: value,
      });
    }
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("name", employee.name);
  formData.append("email", employee.email);
  formData.append("employeeId", employee.employeeId);
  formData.append("dob", employee.dob);
  formData.append("gender", employee.gender);
  formData.append("maritalStatus", employee.maritalStatus);
  formData.append("designation", employee.designation);
  formData.append("department", employee.department);
  formData.append("salary", employee.salary);
  formData.append("password", employee.password);
  formData.append("role", employee.role);
  formData.append("image", employee.image);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/employee/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      alert("Employee Added Successfully");
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
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
  <h2 className="text-3xl font-bold text-center mb-8">
    Add New Employee
  </h2>

  <form onSubmit={handleSubmit}>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* Employee Name */}
  <div>
    <label className="block text-sm font-medium mb-2">
      Employee Name
    </label>

    <input
      type="text"
      name="name"
      value={employee.name}
      onChange={handleChange}
      placeholder="Enter Employee Name"
      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>

  {/* Email */}
  <div>
    <label className="block text-sm font-medium mb-2">
      Email
    </label>

    <input
      type="email"
      name="email"
      value={employee.email}
      onChange={handleChange}
      placeholder="Enter Email"
      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>

</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

  {/* Employee ID */}
  <div>
    <label className="block text-sm font-medium mb-2">
      Employee ID
    </label>

    <input
      type="text"
      name="employeeId"
      value={employee.employeeId}
      onChange={handleChange}
      placeholder="Enter Employee ID"
      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>

  {/* Date of Birth */}
  <div>
    <label className="block text-sm font-medium mb-2">
      Date of Birth
    </label>

    <input
      type="date"
      name="dob"
      value={employee.dob}
      onChange={handleChange}
      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>

</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

  {/* Gender */}
  <div>
    <label className="block text-sm font-medium mb-2">
      Gender
    </label>

    <select
      name="gender"
      value={employee.gender}
      onChange={handleChange}
      className="w-full border rounded-md px-4 py-2"
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  </div>

  {/* Marital Status */}
  <div>
    <label className="block text-sm font-medium mb-2">
      Marital Status
    </label>

    <select
      name="maritalStatus"
      value={employee.maritalStatus}
      onChange={handleChange}
      className="w-full border rounded-md px-4 py-2"
    >
      <option value="">Select Status</option>
      <option value="Single">Single</option>
      <option value="Married">Married</option>
    </select>
  </div>

</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

  {/* Designation */}
  <div>
    <label className="block text-sm font-medium mb-2">
      Designation
    </label>

    <input
      type="text"
      name="designation"
      value={employee.designation}
      onChange={handleChange}
      placeholder="Enter Designation"
      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>

  {/* Department */}
  <div>
    <label className="block text-sm font-medium mb-2">
      Department
    </label>

    <select
      name="department"
      value={employee.department}
      onChange={handleChange}
      className="w-full border rounded-md px-4 py-2"
    >
      <option value="">Select Department</option>

      {departments.map((dep) => (
        <option key={dep._id} value={dep._id}>
          {dep.dep_name}
        </option>
      ))}
    </select>
  </div>

</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

  {/* Salary */}
  <div>
    <label className="block text-sm font-medium mb-2">
      Salary
    </label>

    <input
      type="number"
      name="salary"
      value={employee.salary}
      onChange={handleChange}
      placeholder="Enter Salary"
      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>

  {/* Password */}
  <div>
    <label className="block text-sm font-medium mb-2">
      Password
    </label>

    <input
      type="password"
      name="password"
      value={employee.password}
      onChange={handleChange}
      placeholder="Enter Password"
      className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>

</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

  {/* Role */}
  <div>
    <label className="block text-sm font-medium mb-2">
      Role
    </label>

    <select
      name="role"
      value={employee.role}
      onChange={handleChange}
      className="w-full border rounded-md px-4 py-2"
    >
      <option value="employee">Employee</option>
      <option value="admin">Admin</option>
    </select>
  </div>

  {/* Upload Image */}
  <div>
    <label className="block text-sm font-medium mb-2">
      Upload Image
    </label>

    <input
      type="file"
      name="image"
      accept="image/*"
      onChange={handleChange}
      className="w-full border rounded-md px-4 py-2"
    />
  </div>

</div>
<div className="mt-8">
  <button
    type="submit"
    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md text-lg font-semibold"
  >
    Add Employee
  </button>
</div>
  </form>
</div>
  );
};

export default AddEmployee;