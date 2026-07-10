import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewLeave = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);

  useEffect(() => {
    fetchLeave();
  }, []);

  const fetchLeave = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leave/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setLeave(response.data.leave);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  if (!leave) {
    return (
      <div className="text-center mt-10">
        Loading...
      </div>
    );
  }
const updateStatus = async (status) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/leave/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      alert("Leave status updated successfully");
      fetchLeave(); // Refresh the leave details
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
    <div className="p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Leave Details
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="font-semibold">Employee</p>
            <p>{leave.employeeId.userId.name}</p>
          </div>

          <div>
            <p className="font-semibold">Email</p>
            <p>{leave.employeeId.userId.email}</p>
          </div>

          <div>
            <p className="font-semibold">Department</p>
            <p>{leave.employeeId.department.dep_name}</p>
          </div>

          <div>
            <p className="font-semibold">Leave Type</p>
            <p>{leave.leaveType}</p>
          </div>

          <div>
            <p className="font-semibold">From Date</p>
            <p>{new Date(leave.fromDate).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="font-semibold">To Date</p>
            <p>{new Date(leave.toDate).toLocaleDateString()}</p>
          </div>

          <div className="col-span-2">
            <p className="font-semibold">Description</p>
            <p>{leave.description}</p>
          </div>

          <div className="col-span-2">
  <p className="font-semibold mb-3">Status</p>

  <div className="flex items-center gap-4 flex-wrap">

    <span
      className={`inline-block px-4 py-2 rounded-lg text-white font-semibold ${
        leave.status === "Approved"
          ? "bg-green-500"
          : leave.status === "Rejected"
          ? "bg-red-500"
          : "bg-yellow-500"
      }`}
    >
      {leave.status}
    </span>

    {leave.status === "Pending" && (
      <>
        <button
          onClick={() => updateStatus("Approved")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Approve
        </button>

        <button
          onClick={() => updateStatus("Rejected")}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Reject
        </button>
      </>
    )}

  </div>
</div>

        </div>

      </div>
    </div>
  );
};

export default ViewLeave;