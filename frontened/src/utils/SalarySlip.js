import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generateSalarySlip = (salary) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Employee Management System", 20, 20);

  doc.setFontSize(15);
  doc.text("Salary Slip", 20, 30);

  // Employee Details
  doc.setFontSize(12);

  doc.text(
    `Employee : ${salary.employeeId.userId.name}`,
    20,
    45
  );

  doc.text(
    `Pay Date : ${new Date(
      salary.payDate
    ).toLocaleDateString()}`,
    20,
    55
  );

  const netSalary =
    salary.basicSalary +
    salary.allowances -
    salary.deductions;

  autoTable(doc, {
    startY: 65,
    head: [["Description", "Amount"]],
    body: [
      ["Basic Salary", `₹${salary.basicSalary}`],
      ["Allowances", `₹${salary.allowances}`],
      ["Deductions", `₹${salary.deductions}`],
      ["Net Salary", `₹${netSalary}`],
    ],
  });

  doc.text(
    "This is a computer generated salary slip.",
    20,
    doc.lastAutoTable.finalY + 20
  );

  doc.save(
    `${salary.employeeId.userId.name}_SalarySlip.pdf`
  );
};

export default generateSalarySlip;