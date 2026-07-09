import Department from "../models/Department.js";

// ======================
// Get All Departments
// ======================
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    return res.status(200).json({
      success: true,
      departments,
    });
  } catch (error) {
    console.log("Get Department Error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ======================
// Add Department
// ======================
const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    const newDep = new Department({
      dep_name,
      description,
    });

    await newDep.save();

    return res.status(200).json({
      success: true,
      department: newDep,
    });
  } catch (error) {
    console.log("Add Department Error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ======================
// Get Single Department
// ======================
const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        error: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      department,
    });
  } catch (error) {
    console.log("Get Department Error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ======================
// Update Department
// ======================
const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;

    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      {
        dep_name,
        description,
      },
      {
        new: true,
      }
    );

    if (!updatedDepartment) {
      return res.status(404).json({
        success: false,
        error: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      department: updatedDepartment,
    });
  } catch (error) {
    console.log("Update Department Error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ======================
// Delete Department
// ======================
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findByIdAndDelete(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        error: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.log("Delete Department Error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export {
  getDepartments,
  addDepartment,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};