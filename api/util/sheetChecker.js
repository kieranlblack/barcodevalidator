// eslint-disable-next-line
const dotenv = require('dotenv').config();
const sql = require('mssql/msnodesqlv8');
const xlsx = require('node-xlsx');

const sqlConfig = {
    driver: 'msnodesqlv8',
    connectionString: `Driver={SQL Server Native Client 11.0};Server={${process.env.SQL_SERVER}};Database={${process.env.SQL_DB}};Trusted_Connection={yes};`,
};

module.exports.checkSheet = async function (sheetName) {
    const workingSheet = xlsx.parse(sheetName);

    const invalidRows = [];

    try {
        const pool = await sql.connect(sqlConfig);

        await Promise.all(workingSheet[0].data.slice(1).map(async (row) => {
            let result = null;

            if (/^[0-9]+$/.test(row[1])) { // if the id number is just a number of any length
                result = await pool.request()
                    .input('serialNumber', sql.Int, row[1])
                    .query('SELECT COUNT(1) FROM LotBox WHERE SerialNo = @serialNumber');
            } else if (/^[0-9]+-[0-9]+$/.test(row[1])) { // if the id number is two numbers of any length seprerated by a hypen
                result = await pool.request()
                    .input('soNumber', sql.NVarChar(6), row[1].split('-')[0])
                    .input('woNumber', sql.Int, row[1].split('-')[1])
                    .query('SELECT COUNT(1) FROM pressrec WHERE SO_NUM = @soNumber AND WO_NUM = @woNumber');
            }

            if (!result || Object.values(result.recordset[0])[0] === 0) {
                invalidRows.push(row);
            }
        }));
    } catch (err) {
        console.log(new Error(err));
        return;
    }

    sql.close();

    return invalidRows;
};

sql.on('error', err => console.log(new Error(err)));
