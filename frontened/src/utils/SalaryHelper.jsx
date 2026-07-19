import { generateSalarySlip } from "./SalarySlip";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "80px",
  },
  {
    name: "Employee",
    selector: (row) => row.employee,
  },
  {
    name: "Salary",
    cell: (row) => `₹ ${row.salary}`,
  },
  {
    name: "Allowance",
    cell: (row) => `₹ ${row.allowance}`,
  },
  {
    name: "Deduction",
    cell: (row) => `₹ ${row.deduction}`,
  },
  {
    name: "Net Salary",
    cell: (row) => `₹ ${row.netSalary}`,
  },
  {
    name: "Pay Date",
    selector: (row) => row.payDate,
  },
  {
    name: "Action",
    cell: (row) => row.action,
    width: "350px",
  },
];

import axios from "axios";


export const SalaryButtons = ({
  _id,
  salaryData,
}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this salary?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/salary/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Salary Deleted Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
   <div className="flex gap-2">

  <button
    onClick={() => navigate(`/admin-dashboard/salary/${_id}`)}
    className="bg-green-500 text-white px-3 py-1 rounded"
  >
    View
  </button>

  <button
    onClick={() => generateSalarySlip(salaryData)}
    className="bg-purple-500 text-white px-3 py-1 rounded"
  >
    PDF
  </button>

  <button
    onClick={() => navigate(`/admin-dashboard/salary/edit/${_id}`)}
    className="bg-blue-500 text-white px-3 py-1 rounded"
  >
    Edit
  </button>

  <button
    onClick={handleDelete}
    className="bg-red-500 text-white px-3 py-1 rounded"
  >
    Delete
  </button>

</div>
  );
};