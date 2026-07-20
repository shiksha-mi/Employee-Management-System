import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportEmployeesToExcel = (employees) => {
  const data = employees.map((emp) => ({
    "Employee Name": emp.name,
    Department: emp.department,
    "Date of Birth": emp.dob,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Employees"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const fileData = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(fileData, "Employees.xlsx");
};

export default exportEmployeesToExcel;