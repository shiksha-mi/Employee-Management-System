import PDFDocument from "pdfkit";
import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";

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