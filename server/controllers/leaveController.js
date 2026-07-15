import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";

// Apply Leave
const addLeave = async (req, res) => {
  try {
    const {
      employeeId,
      leaveType,
      fromDate,
      toDate,
      description,
    } = req.body;

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    const newLeave = new Leave({
      employeeId,
      leaveType,
      fromDate,
      toDate,
      description,
    });

    await newLeave.save();

    return res.status(200).json({
      success: true,
      message: "Leave Applied Successfully",
    });

  } catch (error) {
    console.log("========== ADD LEAVE ERROR ==========");
    console.error(error);
    console.log("=====================================");

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Admin - Get All Leaves
const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: {
        path: "userId",
        select: "name profileImage",
      },
    });

    return res.status(200).json({
      success: true,
      leaves,
    });

  } catch (error) {
    console.log("========== GET LEAVES ERROR ==========");
    console.error(error);
    console.log(error.stack);
    console.log("======================================");

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Employee - Get My Leaves
const getMyLeaves = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      userId: req.user._id,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    const leaves = await Leave.find({
      employeeId: employee._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      leaves,
    });

  } catch (error) {
    console.log("========== GET MY LEAVES ERROR ==========");
    console.error(error);
    console.log(error.stack);
    console.log("=========================================");

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get Single Leave
const getLeave = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById(id)
      .populate({
        path: "employeeId",
        populate: {
          path: "userId",
          select: "name email profileImage",
        },
      })
      .populate({
        path: "employeeId",
        populate: {
          path: "department",
        },
      });

    if (!leave) {
      return res.status(404).json({
        success: false,
        error: "Leave not found",
      });
    }

    return res.status(200).json({
      success: true,
      leave,
    });

  } catch (error) {
    console.log("========== GET LEAVE ERROR ==========");
    console.error(error);
    console.log(error.stack);
    console.log("=====================================");

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Admin - Update Leave Status
const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leave = await Leave.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        error: "Leave not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave status updated successfully",
      leave,
    });

  } catch (error) {
    console.log("========== UPDATE LEAVE ERROR ==========");
    console.error(error);
    console.log(error.stack);
    console.log("========================================");

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export {
  addLeave,
  getLeaves,
  getMyLeaves,
  getLeave,
  updateLeaveStatus,
};