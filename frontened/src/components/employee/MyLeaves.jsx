import React, { useEffect, useState } from "react";
import axios from "axios";

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/leave/my-leaves",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLeaves(response.data.leaves);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchLeaves();
  }, []);

  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6">
        My Leaves
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3 text-left">Leave Type</th>
              <th className="p-3 text-left">From</th>
              <th className="p-3 text-left">To</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {leaves.map((leave) => (

              <tr
                key={leave._id}
                className="border-b"
              >
                <td className="p-3">
                  {leave.leaveType}
                </td>

                <td className="p-3">
                  {new Date(
                    leave.fromDate
                  ).toLocaleDateString()}
                </td>

                <td className="p-3">
                  {new Date(
                    leave.toDate
                  ).toLocaleDateString()}
                </td>

                <td className="p-3">
                  {leave.description}
                </td>

                <td
                  className={`p-3 font-semibold ${
                    leave.status === "Approved"
                      ? "text-green-600"
                      : leave.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {leave.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MyLeaves;