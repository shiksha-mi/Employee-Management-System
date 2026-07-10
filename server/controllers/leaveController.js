import Leave from "../models/Leave.js";

const addLeave = async (req, res) => {
  try {
    const {
      employeeId,
      leaveType,
      fromDate,
      toDate,
      description,
    } = req.body;

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
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

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
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

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
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
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
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export {
  addLeave,
  getLeaves,
  getLeave,
  updateLeaveStatus,
};