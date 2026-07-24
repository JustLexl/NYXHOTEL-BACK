const ExcelJS = require('exceljs');

async function debugRow2() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(`C:\\Users\\Sistemas\\Downloads\\INVENTARIO NYX HOTEL CANCUN.xlsx`);
    const worksheet = workbook.getWorksheet(1);
    
    const row1 = worksheet.getRow(1);
    const row2 = worksheet.getRow(2);

    console.log('Row 1 (Headers):');
    row1.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        console.log(`Col ${colNumber}: "${cell.value}"`);
    });

    console.log('\nRow 2 (Data):');
    row2.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        console.log(`Col ${colNumber}: "${cell.value}"`);
    });
}

debugRow2();
