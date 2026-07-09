import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const navigate = useNavigate();

  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDepartment({
      ...department,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("Department Added Successfully");

        navigate("/admin-dashboard/departments");
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
    <div className="flex items-center justify-center min-h-[90vh] bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-4xl font-bold text-center mb-8">
          Add New Department
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              Department Name
            </label>

            <input
              type="text"
              name="dep_name"
              value={department.dep_name}
              onChange={handleChange}
              placeholder="Enter Department Name"
              required
              className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="mb-8">
            <label className="block text-lg font-medium mb-2">
              Department Description
            </label>

            <textarea
              name="description"
              value={department.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter Department Description"
              className="w-full border rounded-md px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-md transition"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;