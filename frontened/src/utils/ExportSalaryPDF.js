import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportSalaryToPDF = (salaryData) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Employee Management System", 14, 20);

  doc.setFontSize(14);
  doc.text("Salary Report", 14, 30);

  const tableData = salaryData.map((salary, index) => [
    index + 1,
    salary.employee,
    salary.salary,
    salary.allowance,
    salary.deduction,
    salary.netSalary,
    salary.payDate,
  ]);

  autoTable(doc, {
    startY: 40,
    head: [[
      "S.No",
      "Employee",
      "Basic",
      "Allowance",
      "Deduction",
      "Net Salary",
      "Pay Date",
    ]],
    body: tableData,
  });

  doc.save("Salary_Report.pdf");
};

export default exportSalaryToPDF;