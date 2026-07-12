import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import Leave from "../models/Leave.js";
import Salary from "../models/Salary.js";

const getSummary = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const totalSalaryRecords = await Salary.countDocuments();

    const pendingLeaves = await Leave.countDocuments({
      status: "Pending",
    });

    const approvedLeaves = await Leave.countDocuments({
      status: "Approved",
    });

    const rejectedLeaves = await Leave.countDocuments({
      status: "Rejected",
    });

    res.status(200).json({
      success: true,
      totalEmployees,
      totalDepartments,
      totalSalaryRecords,
      pendingLeaves,
      approvedLeaves,
      rejectedLeaves,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ======================
// Dashboard Charts API
// ======================

const getChartData = async (req, res) => {
  try {
    // Employees grouped by department
    const employeeByDepartment = await Employee.aggregate([
      {
        $group: {
          _id: "$department",
          total: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "departments",
          localField: "_id",
          foreignField: "_id",
          as: "department",
        },
      },
      {
        $unwind: "$department",
      },
      {
        $project: {
          department: "$department.dep_name",
          total: 1,
        },
      },
    ]);

    // Leaves grouped by status
    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      employeeByDepartment,
      leaveStatus,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export { getSummary, getChartData };