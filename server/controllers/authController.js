import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";
import OTP from "../models/Otp.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        error: "Wrong Password",
      });
    }

    const employee = await Employee.findOne({
      userId: user._id,
    }).populate("department", "dep_name");

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "10d",
      }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        department: employee?.department?.dep_name || "N/A",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const verify = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      userId: req.user._id,
    }).populate("department", "dep_name");

    return res.status(200).json({
      success: true,
      user: {
        ...req.user.toObject(),
        department: employee?.department?.dep_name || "N/A",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    let updateData = {
      name,
      email,
    };

    // If a new image is uploaded
    if (req.file) {
      updateData.profileImage = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(
  req.user._id,
  updateData,
  {
    returnDocument: "after",
  }
).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

 const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Delete old OTP (if any)
    await OTP.deleteMany({ email });

    // Save new OTP (valid for 10 minutes)
    await OTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    // Send OTP email
    await sendEmail(
      email,
      "Password Reset OTP",
      `
      <h2>Employee Management System</h2>

      <p>Hello <b>${user.name}</b>,</p>

      <p>Your OTP for password reset is:</p>

      <h1 style="color:#0f766e;">${otp}</h1>

      <p>This OTP will expire in <b>10 minutes</b>.</p>

      <p>If you didn't request this, you can safely ignore this email.</p>

      <br>

      <p>Regards,</p>
      <p><b>HR Department</b></p>
      `
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find OTP record
    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord) {
      return res.status(404).json({
        success: false,
        message: "OTP not found",
      });
    }

    console.log("OTP from DB:", otpRecord.otp);
    console.log("OTP entered:", otp);

    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP Verified",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  login,
  verify,
  updateProfile,
  changePassword,
  forgotPassword,
  verifyOTP,
  resetPassword,
};