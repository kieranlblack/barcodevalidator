// eslint-disable-next-line
const dotenv = require('dotenv').config();
const sql = require('mssql/msnodesqlv8');
const xlsx = require('node-xlsx');

const sqlConfig = {
    driver: 'msnodesqlv8',
    connectionString: `Driver={SQL Server Native Client 11.0};Server={${process.env.SQL_SERVER}};Database={${process.env.SQL_DB}};Trusted_Connection={yes};`,
};

module.exports.checkSheet = async function (sheetPath) {
    const workingSheet = xlsx.parse(sheetPath);
    if (workingSheet[0].data.length === 0) return;

    const invalidRows = [];
    const titles = [...workingSheet[0].data[0].filter(i => i !== ''), 'rowNum'];
    const barcodeIndex = titles.indexOf('Barcode');

    sql.close();

    try {
        const pool = await sql.connect(sqlConfig);

        await Promise.all(workingSheet[0].data.slice(1).map(async (row, index) => {
            let result = null;

            if (/^[0-9]+$/.test(row[barcodeIndex])) { // if the id number is just a number of any length
                result = await pool.request()
                    .input('serialNumber', sql.Int, row[barcodeIndex])
                    .query('SELECT COUNT(1) FROM LotBox WHERE SerialNo = @serialNumber');
            } else if (/^[0-9]+-[0-9]+$/.test(row[barcodeIndex])) { // if the id number is two numbers of any length seprerated by a hypen
                result = await pool.request()
                    .input('soNumber', sql.NVarChar(6), row[barcodeIndex].split('-')[0])
                    .input('woNumber', sql.Int, row[barcodeIndex].split('-')[1])
                    .query('SELECT COUNT(1) FROM pressrec WHERE SO_NUM = @soNumber AND WO_NUM = @woNumber');
            }

            if (!result || Object.values(result.recordset[0])[0] === 0) {
                row.push(index + 2);
                invalidRows.push(row);
            }
        }));
    } catch (err) {
        console.log(new Error(err));
        return;
    }

    sql.close();

    return invalidRows.map(row => row.reduce((acc, current, index) => {
        acc[titles[index].toLowerCase()] = current;
        return acc;
    }, {}));
};

sql.on('error', err => console.log(new Error(err)));
