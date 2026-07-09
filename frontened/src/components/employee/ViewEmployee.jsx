import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewEmployee = () => {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);

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
          setEmployee(response.data.employee);
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

    fetchEmployee();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!employee) return <div className="text-center mt-10">Employee Not Found</div>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Employee Details
      </h2>

      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <img
            src={`http://localhost:5000/uploads/${employee.userId.profileImage}`}
            alt="Employee"
            className="w-40 h-40 rounded-full object-cover border"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <p><strong>Name:</strong> {employee.userId.name}</p>
          <p><strong>Email:</strong> {employee.userId.email}</p>

          <p><strong>Employee ID:</strong> {employee.employeeId}</p>
          <p><strong>Department:</strong> {employee.department.dep_name}</p>

          <p><strong>Designation:</strong> {employee.designation}</p>
          <p><strong>Salary:</strong> ₹{employee.salary}</p>

          <p><strong>Date of Birth:</strong> {new Date(employee.dob).toLocaleDateString()}</p>
          <p><strong>Gender:</strong> {employee.gender}</p>

          <p><strong>Marital Status:</strong> {employee.maritalStatus}</p>
          <p><strong>Role:</strong> {employee.role}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;