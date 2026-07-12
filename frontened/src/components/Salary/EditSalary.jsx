import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditSalary = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [salary, setSalary] = useState({
    basicSalary: "",
    allowances: "",
    deductions: "",
    payDate: "",
  });

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
          const data = response.data.salary;

          setSalary({
            basicSalary: data.basicSalary,
            allowances: data.allowances,
            deductions: data.deductions,
            payDate: data.payDate.split("T")[0],
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSalary();
  }, [id]);

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

      const response = await axios.put(
        `http://localhost:5000/api/salary/${id}`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Salary Updated Successfully");
        navigate("/admin-dashboard/salary");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
      <h2 className="text-3xl font-bold text-center mb-8">
        Edit Salary
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="number"
          name="basicSalary"
          value={salary.basicSalary}
          onChange={handleChange}
          placeholder="Basic Salary"
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          name="allowances"
          value={salary.allowances}
          onChange={handleChange}
          placeholder="Allowances"
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          name="deductions"
          value={salary.deductions}
          onChange={handleChange}
          placeholder="Deductions"
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          type="date"
          name="payDate"
          value={salary.payDate}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Update Salary
        </button>

      </form>
    </div>
  );
};

export default EditSalary;