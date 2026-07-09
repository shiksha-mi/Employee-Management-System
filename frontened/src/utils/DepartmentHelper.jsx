import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    sortable: true,
    width: "100px",
    center: true,
  },
  {
    name: (
      <div className="w-full text-center">
        Department Name
        
      </div>
    ),
    selector: (row) => row.dep_name,
    sortable: true,
    cell: (row) => (
      <div className="w-full text-center">
        {row.dep_name}
      </div>
    ),
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

export const DepartmentButtons = ({ _id, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/department/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("Department Deleted Successfully");

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
    <div className="flex gap-3 justify-center">
      <button
        onClick={() => navigate(`/admin-dashboard/departments/${_id}`)}
        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded w-20"
      >
        Edit
      </button>

      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-20"
      >
        Delete
      </button>
    </div>
  );
};