import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

// Admin: Mark Attendance
const markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    // Check if attendance already exists for the same day
    const existingAttendance = await Attendance.findOne({
      employeeId,
      date,
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        error: "Attendance already marked for this date",
      });
    }

    const attendance = new Attendance({
      employeeId,
      date,
      status,
    });

    await attendance.save();

    return res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      attendance,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Admin: Get all attendance
const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate({
        path: "employeeId",
        populate: {
          path: "userId",
          select: "name profileImage",
        },
      })
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      attendance,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Employee: Get My Attendance
const getMyAttendance = async (req, res) => {
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

    const attendance = await Attendance.find({
      employeeId: employee._id,
    }).sort({ date: -1 });

    return res.status(200).json({
      success: true,
      attendance,
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
  markAttendance,
  getAttendance,
  getMyAttendance,
};