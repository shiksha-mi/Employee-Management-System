import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import exportEmployeesToExcel from "../../utils/ExportEmployeeExcel";
import exportEmployeesToPDF from "../../utils/ExportEmployeePDF";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [searchText, setSearchText] = useState("");
const [selectedDepartment, setSelectedDepartment] = useState("");

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
  const fetchDepartments = async () => {
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
      setDepartments(response.data.departments);
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
  fetchEmployees();
  fetchDepartments();
}, []);

 const filterEmployees = (e) => {
  const value = e.target.value;
  setSearchText(value);

  applyFilters(value, selectedDepartment);
};
  const filterByDepartment = (e) => {
  const value = e.target.value;
  setSelectedDepartment(value);

  applyFilters(searchText, value);
};

const applyFilters = (search, department) => {
  let records = employees;

  if (search) {
    records = records.filter((emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (department) {
    records = records.filter(
      (emp) => emp.department === department
    );
  }

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

          <div className="flex justify-between items-center my-5">

  <div className="flex gap-4">

    <input
      type="text"
      placeholder="Search Employee"
      onChange={filterEmployees}
      className="px-4 py-2 border rounded-md"
    />

    <select
      onChange={filterByDepartment}
      className="px-4 py-2 border rounded-md"
    >
      <option value="">All Departments</option>

      {departments.map((dept) => (
        <option
          key={dept._id}
          value={dept.dep_name}
        >
          {dept.dep_name}
        </option>
      ))}
    </select>

  </div>

 <div className="flex gap-3">

  <button
    onClick={() => exportEmployeesToExcel(filteredEmployees)}
    className="px-4 py-2 bg-green-600 text-white rounded"
  >
    Export Excel
  </button>

  <button
    onClick={() => exportEmployeesToPDF(filteredEmployees)}
    className="px-4 py-2 bg-red-600 text-white rounded"
  >
    Export PDF
  </button>

  <Link
    to="/admin-dashboard/add-employee"
    className="px-4 py-2 bg-teal-600 text-white rounded"
  >
    Add New Employee
  </Link>

</div>

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