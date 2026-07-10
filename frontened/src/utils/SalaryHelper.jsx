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
    selector: (row) => row.salary,
  },
  {
    name: "Allowance",
    selector: (row) => row.allowance,
  },
  {
    name: "Deduction",
    selector: (row) => row.deduction,
  },
  {
    name: "Pay Date",
    selector: (row) => row.payDate,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const SalaryButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => navigate(`/admin-dashboard/salary/${_id}`)}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        View
      </button>

      <button
        onClick={() => navigate(`/admin-dashboard/salary/edit/${_id}`)}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Edit
      </button>
    </div>
  );
};