import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;

export const generateSalarySlip = (salary) => {
  const netSalary =
    Number(salary.basicSalary) +
    Number(salary.allowances) -
    Number(salary.deductions);

  const formatCurrency = (amount) =>
    Number(amount).toLocaleString("en-IN");

  const docDefinition = {
    pageSize: "A4",

    pageMargins: [40, 50, 40, 50],

    content: [
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: "EMPLOYEE MANAGEMENT SYSTEM",
                alignment: "center",
                color: "white",
                fillColor: "#0F766E",
                bold: true,
                fontSize: 22,
                margin: [0, 10, 0, 10],
              },
            ],
          ],
        },
        layout: "noBorders",
      },

      {
        text: "SALARY SLIP",
        style: "title",
      },

      {
        text:
          "Generated on : " +
          new Date().toLocaleDateString(),
        alignment: "right",
        margin: [0, 0, 0, 20],
      },

      {
        text: "EMPLOYEE DETAILS",
        style: "heading",
      },

      {
        table: {
          widths: ["35%", "*"],
          body: [
            ["Employee Name", salary.employeeId.userId.name],
            ["Employee ID", salary.employeeId.employeeId],
            ["Designation", salary.employeeId.designation],
            [
              "Department",
              salary.employeeId.department || "N/A",
            ],
            [
              "Pay Date",
              new Date(salary.payDate).toLocaleDateString(),
            ],
          ],
        },
      },

      {
        text: "\nSALARY DETAILS",
        style: "heading",
      },

      {
        table: {
          headerRows: 1,
          widths: ["*", "*"],
          body: [
            [
              {
                text: "Description",
                bold: true,
                fillColor: "#0F766E",
                color: "white",
              },
              {
                text: "Amount (₹)",
                bold: true,
                fillColor: "#0F766E",
                color: "white",
              },
            ],

            [
              "Basic Salary",
              "₹ " + formatCurrency(salary.basicSalary),
            ],

            [
              "Allowances",
              "₹ " + formatCurrency(salary.allowances),
            ],

            [
              "Deductions",
              "₹ " + formatCurrency(salary.deductions),
            ],

            [
              {
                text: "Net Salary",
                bold: true,
              },

              {
                text:
                  "₹ " + formatCurrency(netSalary),
                bold: true,
              },
            ],
          ],
        },
      },

      {
        text:
          "\n\nThis is a system generated salary slip and does not require a physical signature.",
        italics: true,
        alignment: "center",
        margin: [0, 25, 0, 25],
      },

      {
        columns: [
          {},
          {
            width: 180,
            stack: [
              {
                text: "___________________",
                alignment: "center",
              },

              {
                text: "Authorized Signatory",
                alignment: "center",
                bold: true,
              },

              {
                text: "HR Department",
                alignment: "center",
              },
            ],
          },
        ],
      },
    ],

    styles: {
      title: {
        fontSize: 18,
        bold: true,
        alignment: "center",
        margin: [0, 20, 0, 20],
      },

      heading: {
        fontSize: 14,
        bold: true,
        color: "#0F766E",
        margin: [0, 10, 0, 10],
      },
    },
  };

  pdfMake.createPdf(docDefinition).download(
    `SalarySlip-${salary.employeeId.employeeId}.pdf`
  );
};