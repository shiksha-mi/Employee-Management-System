import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportLeaveToExcel = (leaveData) => {
  const data = leaveData.map((leave) => ({
    Employee: leave.employee,
    "Leave Type": leave.leaveType,
    "From Date": leave.fromDate,
    "To Date": leave.toDate,
    Status: leave.status.props.children,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Leaves"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const fileData = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(fileData, "Leave_Report.xlsx");
};

export default exportLeaveToExcel;