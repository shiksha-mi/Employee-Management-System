import Salary from "../models/Salary.js";

const addSalary = async (req, res) => {
  try {
    const {
      employeeId,
      basicSalary,
      allowances,
      deductions,
      payDate,
    } = req.body;

    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      payDate,
    });

    await newSalary.save();

    return res.status(200).json({
      success: true,
      message: "Salary Added Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find()
      .populate({
        path: "employeeId",
        populate: {
          path: "userId",
          select: "name profileImage",
        },
      });

    return res.status(200).json({
      success: true,
      salaries,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getSalary = async (req, res) => {
  try {
    const { id } = req.params;

    const salary = await Salary.findById(id)
      .populate({
        path: "employeeId",
        populate: [
          {
            path: "userId",
            select: "name profileImage",
          },
          {
            path: "department",
            select: "dep_name",
          },
        ],
      });

    return res.status(200).json({
      success: true,
      salary,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateSalary = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      basicSalary,
      allowances,
      deductions,
      payDate,
    } = req.body;

    await Salary.findByIdAndUpdate(id, {
      basicSalary,
      allowances,
      deductions,
      payDate,
    });

    return res.status(200).json({
      success: true,
      message: "Salary Updated Successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
const deleteSalary = async (req, res) => {
  try {
    const { id } = req.params;

    await Salary.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Salary Deleted Successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export {
  addSalary,
  getSalaries,
  getSalary,
  updateSalary,
  deleteSalary,
};