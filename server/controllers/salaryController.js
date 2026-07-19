import PDFDocument from "pdfkit";
import Salary from "../models/Salary.js";
import sendEmail from "../utils/sendEmail.js";
import Employee from "../models/Employee.js";
import User from "../models/User.js";

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

    // Find employee
    const employee = await Employee.findById(employeeId);

    if (employee) {
      // Find user
      const user = await User.findById(employee.userId);

      if (user) {
        console.log("Sending salary email to:", user.email);
        const netSalary =
  Number(basicSalary) +
  Number(allowances) -
  Number(deductions);

await sendEmail(
  user.email,
  `Salary Credited - ${new Date(payDate).toLocaleDateString()}`,
  `
  <div style="font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:auto;border:1px solid #ddd;border-radius:8px;">
      <h2 style="color:#0f766e;">
          Employee Management System
      </h2>

      <p>Dear <b>${user.name}</b>,</p>

      <p>Your salary has been credited successfully.</p>

      <p><b>Basic Salary:</b> ₹${basicSalary}</p>
      <p><b>Allowances:</b> ₹${allowances}</p>
      <p><b>Deductions:</b> ₹${deductions}</p>
      <p><b>Net Salary:</b> ₹${netSalary}</p>
      <p><b>Pay Date:</b> ${new Date(payDate).toLocaleDateString()}</p>

      <hr>

      <p>Thank you for your dedication and hard work.</p>

      <br>

      <p>Regards,</p>
      <p><b>HR Department</b></p>
      <p>Employee Management System</p>
  </div>
  `
);
      }
    }

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
const getMySalary = async (req, res) => {
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

    const salary = await Salary.findOne({
      employeeId: employee._id,
    }).populate({
      path: "employeeId",
      populate: {
        path: "department",
        select: "dep_name",
      },
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

const downloadSalarySlip = async (req, res) => {
  try {
    const { id } = req.params;

    const salary = await Salary.findById(id).populate({
      path: "employeeId",
      populate: [
        {
          path: "userId",
          select: "name email",
        },
        {
          path: "department",
          select: "dep_name",
        },
      ],
    });

    if (!salary) {
      return res.status(404).json({
        success: false,
        error: "Salary record not found",
      });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=SalarySlip-${salary.employeeId.userId.name}.pdf`
    );

    doc.pipe(res);

    // Company Name
    doc
      .fontSize(22)
      .fillColor("#0f766e")
      .text("Employee Management System", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(18)
      .fillColor("black")
      .text("Salary Slip", {
        align: "center",
      });

    doc.moveDown(2);

    doc.fontSize(12);

    doc.text(`Employee Name : ${salary.employeeId.userId.name}`);
    doc.text(`Email         : ${salary.employeeId.userId.email}`);
    doc.text(
      `Department    : ${
        salary.employeeId.department?.dep_name || "N/A"
      }`
    );

    doc.moveDown();

    doc.text(`Basic Salary  : ₹${salary.basicSalary}`);
    doc.text(`Allowances    : ₹${salary.allowances}`);
    doc.text(`Deductions    : ₹${salary.deductions}`);

    const netSalary =
      Number(salary.basicSalary) +
      Number(salary.allowances) -
      Number(salary.deductions);

    doc.moveDown();

    doc
      .fontSize(14)
      .fillColor("green")
      .text(`Net Salary : ₹${netSalary}`);

    doc.moveDown(2);

    doc
      .fillColor("black")
      .text(`Pay Date : ${new Date(salary.payDate).toLocaleDateString()}`);

    doc.moveDown(4);

    doc.text("__________________________");
    doc.text("Authorized Signature");

    doc.end();
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
  getMySalary,
  downloadSalarySlip,
};