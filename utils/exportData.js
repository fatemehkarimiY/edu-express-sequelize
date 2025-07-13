const exceljs = require("exceljs");


const exportData = (data, worksheetName = "Worksheet", columns = []) => {
    let workbook = new exceljs.Workbook();
    let worksheet = workbook.addWorksheet(worksheetName);
    worksheet.columns = columns;
    worksheet.addRows(data);
    return workbook;
};

module.exports = { exportData };
    