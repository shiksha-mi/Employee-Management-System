import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewSalary = () => {
  const { id } = useParams();

  const [salary, setSalary] = useState(null);

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5000/api/salary/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setSalary(response.data.salary);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSalary();
  }, [id]);

  if (!salary) {
    return (
      <div className="text-center mt-10 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Salary Details
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="font-semibold">Employee Name</p>
          <p>{salary.employeeId.userId.name}</p>
        </div>

        <div>
          <p className="font-semibold">Department</p>
          <p>{salary.employeeId.department.dep_name}</p>
        </div>

        <div>
          <p className="font-semibold">Basic Salary</p>
          <p>₹ {salary.basicSalary}</p>
        </div>

        <div>
          <p className="font-semibold">Allowances</p>
          <p>₹ {salary.allowances}</p>
        </div>

        <div>
          <p className="font-semibold">Deductions</p>
          <p>₹ {salary.deductions}</p>
        </div>

        <div>
          <p className="font-semibold">Pay Date</p>
          <p>{new Date(salary.payDate).toLocaleDateString()}</p>
        </div>

      </div>
    </div>
  );
};

export default ViewSalary;