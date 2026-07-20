import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportEmployeesToPDF = (employees) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Employee Management System", 14, 20);

  doc.setFontSize(14);
  doc.text("Employee Report", 14, 30);

  // Convert employee data
  const tableData = employees.map((emp, index) => [
    index + 1,
    emp.name,
    emp.department,
    emp.dob,
  ]);

  autoTable(doc, {
    startY: 40,
    head: [["S.No", "Name", "Department", "Date of Birth"]],
    body: tableData,
  });

  doc.save("Employees_Report.pdf");
};

export default exportEmployeesToPDF;