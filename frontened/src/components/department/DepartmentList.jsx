import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);

  // Fetch Departments
  const fetchDepartmentList = async () => {
    setDepLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:5000/api/department",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        let sno = 1;

        const data = response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons
              _id={dep._id}
              onDelete={fetchDepartmentList}
            />
          ),
        }));

        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("Server Error");
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartmentList();
  }, []);

  // Search Department
  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );

    setFilteredDepartments(records);
  };

  return (
    <>
      {depLoading ? (
        <div className="text-center mt-10 text-lg font-semibold">
          Loading...
        </div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">
              Manage Departments
            </h3>
          </div>

          <div className="flex justify-between items-center my-4">
            <input
              type="text"
              placeholder="Search Department"
              onChange={filterDepartments}
              className="px-4 py-2 border rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              Add New Department
            </Link>
          </div>

          <div className="mt-5">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
              highlightOnHover
              responsive
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;