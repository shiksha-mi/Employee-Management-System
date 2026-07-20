import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportLeaveToPDF = (leaveData) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Employee Management System", 14, 20);

  doc.setFontSize(14);
  doc.text("Leave Report", 14, 30);

  const tableData = leaveData.map((leave, index) => [
    index + 1,
    leave.employee,
    leave.leaveType,
    leave.fromDate,
    leave.toDate,
    leave.status.props.children,
  ]);

  autoTable(doc, {
    startY: 40,
    head: [[
      "S.No",
      "Employee",
      "Leave Type",
      "From",
      "To",
      "Status",
    ]],
    body: tableData,
  });

  doc.save("Leave_Report.pdf");
};

export default exportLeaveToPDF;