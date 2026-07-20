import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { columns, SalaryButtons } from "../../utils/SalaryHelper";
import generateSalarySlip from "../../utils/SalarySlip";
import exportSalaryToExcel from "../../utils/ExportSalaryExcel";
import exportSalaryToPDF from "../../utils/ExportSalaryPDF";

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

        // Remove salary records that don't have an employee
        const validSalaries = response.data.salaries.filter(
          (salary) => salary.employeeId && salary.employeeId.userId
        );

        const data = validSalaries.map((salary) => ({
          _id: salary._id,
          sno: sno++,

          employee: salary.employeeId.userId.name,

          // ✅ Fixed
          salary: salary.basicSalary,

          allowance: salary.allowances,

          deduction: salary.deductions,

          netSalary:
            Number(salary.basicSalary) +
            Number(salary.allowances) -
            Number(salary.deductions),

          payDate: new Date(salary.payDate).toLocaleDateString(),

          action: (
            <SalaryButtons
              _id={salary._id}
              salaryData={salary}
            />
          ),
        }));

        console.log(data);

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

          <div className="flex justify-between items-center my-5">
            <input
              type="text"
              placeholder="Search Employee"
              onChange={filterSalary}
              className="px-4 py-2 border rounded-md"
            />

            <div className="flex gap-3">

  <button
    onClick={() => exportSalaryToExcel(filteredSalary)}
    className="px-4 py-2 bg-green-600 text-white rounded"
  >
    Export Excel
  </button>

  <button
    onClick={() => exportSalaryToPDF(filteredSalary)}
    className="px-4 py-2 bg-red-600 text-white rounded"
  >
    Export PDF
  </button>

  <Link
    to="/admin-dashboard/add-salary"
    className="px-4 py-2 bg-teal-600 text-white rounded"
  >
    Add Salary
  </Link>

</div>
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