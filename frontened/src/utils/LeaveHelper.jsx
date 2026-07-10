import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "80px",
    center: true,
  },
  {
    name: "Employee",
    selector: (row) => row.employee,
    sortable: true,
    center: true,
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    sortable: true,
    center: true,
  },
  {
    name: "From",
    selector: (row) => row.fromDate,
    center: true,
  },
  {
    name: "To",
    selector: (row) => row.toDate,
    center: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    center: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

export const LeaveButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() =>
        navigate(`/admin-dashboard/leaves/${_id}`)
      }
      className="bg-blue-500 text-white px-3 py-1 rounded"
    >
      View
    </button>
  );
};