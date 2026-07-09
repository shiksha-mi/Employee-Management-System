import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    sortable: true,
    width: "80px",
    center: true,
  },
  {
    name: "Image",
    selector: (row) => row.image,
    center: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    center: true,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    sortable: true,
    center: true,
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    center: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

export const EmployeeButtons = ({ _id, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/employee/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("Employee Deleted Successfully");

        if (onDelete) {
          onDelete();
        }
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("Server Error");
      }
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() =>
          navigate(`/admin-dashboard/employees/view/${_id}`)
        }
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        View
      </button>

      <button
        onClick={() =>
          navigate(`/admin-dashboard/employees/${_id}`)
        }
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