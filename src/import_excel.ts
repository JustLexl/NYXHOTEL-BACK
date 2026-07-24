import dotenv from 'dotenv';
dotenv.config();

import ExcelJS from 'exceljs';
import { connect } from './shared/database/mongodb';
import { InventarioDto } from './api/inventario/inventarioDto';

async function importExcelToMongo() {
    console.log('🚀 Starting Excel import...');
    
    const db = await connect();
    const collection = db.collection<InventarioDto>('Inventario');

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(`C:\\Users\\Sistemas\\Downloads\\INVENTARIO NYX HOTEL CANCUN.xlsx`);

    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) {
        throw new Error('Worksheet not found in Excel file');
    }

    const items: InventarioDto[] = [];

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header

        const getVal = (colIndex: number): string => {
            const cell = row.getCell(colIndex);
            if (!cell || cell.value === null || cell.value === undefined) return '';
            let val: any = cell.value;
            if (typeof val === 'object') {
                if (val.result !== undefined) val = val.result;
                else if (val.richText) val = val.richText.map((rt: any) => rt.text).join('');
                else if (val.text) val = val.text;
                else val = JSON.stringify(val);
            }
            return String(val).trim();
        };

        const departamento = getVal(1);
        const puesto = getVal(2);
        const nombreEquipo = getVal(3);
        const equipo = getVal(4);
        const marcaModelo = getVal(5);
        const numeroSerie = getVal(6);
        const monitor = getVal(7);
        const impresora = getVal(8);
        const ip = getVal(9);
        const procesador = getVal(10);
        const memoria = getVal(11);
        const versionSO = getVal(12);
        const origComentarios = getVal(13);

        const extraDetails: string[] = [];
        if (procesador) extraDetails.push(`Procesador: ${procesador}`);
        if (ip) extraDetails.push(`IP: ${ip}`);
        if (monitor) extraDetails.push(`Monitor: ${monitor}`);
        if (impresora) extraDetails.push(`Impresora: ${impresora}`);

        let comentarios = origComentarios;
        if (extraDetails.length > 0) {
            const extraStr = extraDetails.join(' | ');
            comentarios = comentarios ? `${comentarios} (${extraStr})` : extraStr;
        }

        if (departamento || puesto || nombreEquipo || equipo || marcaModelo || numeroSerie) {
            items.push({
                departamento,
                puesto,
                nombreEquipo,
                equipo,
                marcaModelo,
                numeroSerie,
                memoria,
                versionSO,
                comentarios,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
    });

    console.log(`📋 Found ${items.length} items to insert from Excel.`);

    if (items.length > 0) {
        const result = await collection.insertMany(items);
        console.log(`✅ Successfully inserted ${result.insertedCount} items into 'Inventario' collection!`);
    } else {
        console.log('⚠️ No valid items found to insert.');
    }

    process.exit(0);
}

importExcelToMongo().catch((err) => {
    console.error('❌ Error importing excel:', err);
    process.exit(1);
});
