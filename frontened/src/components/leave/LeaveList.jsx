import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaves = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:5000/api/leave",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        let sno = 1;

        const validLeaves = response.data.leaves.filter(
  (leave) => leave.employeeId
);

const data = validLeaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,

          employee: leave.employeeId.userId.name,
          leaveType: leave.leaveType,

          fromDate: new Date(
            leave.fromDate
          ).toLocaleDateString(),

          toDate: new Date(
            leave.toDate
          ).toLocaleDateString(),

          status: (
            <span
              className={`px-2 py-1 rounded text-white ${
                leave.status === "Approved"
                  ? "bg-green-500"
                  : leave.status === "Rejected"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            >
              {leave.status}
            </span>
          ),

          action: <LeaveButtons _id={leave._id} />,
        }));

        setLeaves(data);
        setFilteredLeaves(data);
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
    fetchLeaves();
  }, []);

  const filterLeaves = (e) => {
    const records = leaves.filter((leave) =>
      leave.employee
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );

    setFilteredLeaves(records);
  };

  return (
    <>
      {loading ? (
        <div className="text-center mt-10">
          Loading...
        </div>
      ) : (
        <div className="p-5">

          <div className="text-center">
            <h3 className="text-2xl font-bold">
              Manage Leaves
            </h3>
          </div>

          <div className="flex justify-between my-5">

            <input
              type="text"
              placeholder="Search Employee"
              onChange={filterLeaves}
              className="px-4 py-2 border rounded-md"
            />

            <Link
              to="/admin-dashboard/add-leave"
              className="px-4 py-2 bg-teal-600 text-white rounded"
            >
              Add Leave
            </Link>

          </div>

          <DataTable
            columns={columns}
            data={filteredLeaves}
            pagination
            highlightOnHover
            responsive
          />

        </div>
      )}
    </>
  );
};

export default LeaveList;