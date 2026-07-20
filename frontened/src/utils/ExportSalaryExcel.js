import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportSalaryToExcel = (salaryData) => {
  const data = salaryData.map((salary) => ({
    Employee: salary.employee,
    "Basic Salary": salary.salary,
    Allowance: salary.allowance,
    Deduction: salary.deduction,
    "Net Salary": salary.netSalary,
    "Pay Date": salary.payDate,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Salary");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const fileData = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(fileData, "Salary_Report.xlsx");
};

export default exportSalaryToExcel;