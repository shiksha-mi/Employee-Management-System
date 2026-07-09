import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });

    const savedUser = await newUser.save();

    // Create Employee
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password: hashPassword,
      role,
      image: req.file ? req.file.filename : "",
    });

    await newEmployee.save();

    return res.status(200).json({
      success: true,
      message: "Employee Created Successfully",
    });

  } catch (error) {
    console.log("Employee Error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", "-password")
      .populate("department");

    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.log("Employee Error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id)
      .populate("userId", "-password")
      .populate("department");

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      maritalStatus,
      designation,
      department,
      salary,
    } = req.body;

    // Update Employee collection
    const employee = await Employee.findByIdAndUpdate(
      id,
      {
        maritalStatus,
        designation,
        department,
        salary,
      },
      { new: true }
    );

    // Update User collection
    await User.findByIdAndUpdate(employee.userId, {
      name,
    });

    return res.status(200).json({
      success: true,
      message: "Employee Updated Successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Find Employee
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    // Delete User
    await User.findByIdAndDelete(employee.userId);

    // Delete Employee
    await Employee.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Employee Deleted Successfully",
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
  addEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};