import React, { useEffect, useState } from "react";
import axios from "axios";

const MySalary = () => {
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalary();
  }, []);

  const fetchSalary = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/salary/my-salary",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setSalary(response.data.salary);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadSalarySlip = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/salary/download/${salary._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "SalarySlip.pdf");

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      alert("Failed to download salary slip.");
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!salary) {
    return (
      <div className="p-6 text-red-500 font-semibold">
        No salary record found.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Salary</h2>

      <div className="bg-white shadow rounded-lg p-6 space-y-3">
        <p>
          <strong>Employee ID:</strong>{" "}
          {salary.employeeId.employeeId}
        </p>

        <p>
          <strong>Department:</strong>{" "}
          {salary.employeeId.department?.dep_name}
        </p>

        <p>
          <strong>Basic Salary:</strong> ₹{salary.basicSalary}
        </p>

        <p>
          <strong>Allowances:</strong> ₹{salary.allowances}
        </p>

        <p>
          <strong>Deductions:</strong> ₹{salary.deductions}
        </p>

        <p>
          <strong>Net Salary:</strong> ₹
          {Number(salary.basicSalary) +
            Number(salary.allowances) -
            Number(salary.deductions)}
        </p>

        <p>
          <strong>Pay Date:</strong>{" "}
          {new Date(salary.payDate).toLocaleDateString()}
        </p>

        <button
          onClick={downloadSalarySlip}
          className="mt-6 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded"
        >
          Download Salary Slip (PDF)
        </button>
      </div>
    </div>
  );
};

export default MySalary;