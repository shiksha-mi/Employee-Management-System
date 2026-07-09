import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:5000/api/employee",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        let sno = 1;

        const data = response.data.employees.map((emp) => ({
          _id: emp._id,
          sno: sno++,

          image: (
            <img
              src={`http://localhost:5000/uploads/${emp.userId.profileImage}`}
              className="w-10 h-10 rounded-full object-cover"
              alt=""
            />
          ),

          name: emp.userId.name,

          department: emp.department.dep_name,

          dob: new Date(emp.dob).toLocaleDateString(),

          action: (
            <EmployeeButtons
              _id={emp._id}
              onDelete={fetchEmployees}
            />
          ),
        }));

        setEmployees(data);
        setFilteredEmployees(data);
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
    fetchEmployees();
  }, []);

  const filterEmployees = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredEmployees(records);
  };

  return (
    <>
      {loading ? (
        <div className="text-center mt-10">Loading...</div>
      ) : (
        <div className="p-5">

          <div className="text-center">
            <h3 className="text-2xl font-bold">
              Manage Employees
            </h3>
          </div>

          <div className="flex justify-between my-5">

            <input
              type="text"
              placeholder="Search Employee"
              onChange={filterEmployees}
              className="px-4 py-2 border rounded-md"
            />

            <Link
              to="/admin-dashboard/add-employee"
              className="px-4 py-2 bg-teal-600 text-white rounded"
            >
              Add New Employee
            </Link>

          </div>

          <DataTable
            columns={columns}
            data={filteredEmployees}
            pagination
            highlightOnHover
            responsive
          />

        </div>
      )}
    </>
  );
};

export default EmployeeList;