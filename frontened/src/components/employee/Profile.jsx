import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/employee/profile/me",
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
      }
    };

    fetchProfile();
  }, []);

  if (!employee) {
    return (
      <div className="p-6 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6">
        My Profile
      </h2>

      <div className="bg-white shadow rounded-lg p-8">

        <div className="grid grid-cols-2 gap-6">

          <div>
            <strong>Name:</strong> {employee.userId.name}
          </div>

          <div>
            <strong>Email:</strong> {employee.userId.email}
          </div>

          <div>
            <strong>Employee ID:</strong> {employee.employeeId}
          </div>

          <div>
            <strong>Department:</strong> {employee.department.dep_name}
          </div>

          <div>
            <strong>Designation:</strong> {employee.designation}
          </div>

          <div>
            <strong>Gender:</strong> {employee.gender}
          </div>

          <div>
            <strong>Marital Status:</strong> {employee.maritalStatus}
          </div>

          <div>
            <strong>Salary:</strong> ₹{employee.salary}
          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;