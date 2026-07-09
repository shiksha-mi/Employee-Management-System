import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const [depLoading, setDepLoading] = useState(false);

  useEffect(() => {
    const fetchDepartment = async () => {
      setDepLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Server Error");
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

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
      const response = await axios.put(
        `http://localhost:5000/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("Department Updated Successfully");
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
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex items-center justify-center min-h-[90vh] bg-gray-100">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-4xl font-bold text-center mb-8">
              Edit Department
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
                  className="w-full border rounded-md px-4 py-3"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">
                  Department Description
                </label>

                <textarea
                  name="description"
                  rows="4"
                  value={department.description}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-3"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700"
              >
                Edit Department
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDepartment;