import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { columns, SalaryButtons } from "../../utils/SalaryHelper";

const SalaryList = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalary, setFilteredSalary] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSalaries = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:5000/api/salary",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        let sno = 1;

        const data = response.data.salaries.map((salary) => ({
          _id: salary._id,
          sno: sno++,

          employee: salary.employeeId.userId.name,

          salary: `₹${salary.basicSalary}`,

          allowance: `₹${salary.allowances}`,

          deduction: `₹${salary.deductions}`,

          payDate: new Date(
            salary.payDate
          ).toLocaleDateString(),

          action: <SalaryButtons _id={salary._id} />,
        }));

        setSalaries(data);
        setFilteredSalary(data);
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

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalary = (e) => {
    const records = salaries.filter((salary) =>
      salary.employee
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );

    setFilteredSalary(records);
  };

  return (
    <>
      {loading ? (
        <div className="text-center mt-10">Loading...</div>
      ) : (
        <div className="p-5">

          <div className="text-center">
            <h3 className="text-2xl font-bold">
              Manage Salary
            </h3>
          </div>

          <div className="flex justify-between my-5">

            <input
              type="text"
              placeholder="Search Employee"
              onChange={filterSalary}
              className="px-4 py-2 border rounded-md"
            />

            <Link
              to="/admin-dashboard/add-salary"
              className="px-4 py-2 bg-teal-600 text-white rounded"
            >
              Add Salary
            </Link>

          </div>

          <DataTable
            columns={columns}
            data={filteredSalary}
            pagination
            highlightOnHover
            responsive
          />

        </div>
      )}
    </>
  );
};

export default SalaryList;