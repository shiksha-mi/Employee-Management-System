import Employee from "../models/Employee.js";
import Department from "../models/Department.js";

const getSummary = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();

    res.status(200).json({
      success: true,
      totalEmployees,
      totalDepartments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export { getSummary };