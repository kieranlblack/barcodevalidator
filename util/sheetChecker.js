// eslint-disable-next-line
const dotenv = require('dotenv').config();
const sql = require('mssql/msnodesqlv8');
const xlsx = require('node-xlsx');

const sqlConfig = {
    driver: 'msnodesqlv8',
    connectionString: `Driver={SQL Server Native Client 11.0};Server={${process.env.SQL_SERVER}};Database={${process.env.SQL_DB}};Trusted_Connection={yes};`,
};

module.exports.checkSheet = async function (sheetName, callback) {
    const workingSheet = xlsx.parse(sheetName);

    const invalidRows = [];

    await sql.connect(sqlConfig, (err) => {
        if (err) throw new Error(`Unable to connect to the server ${process.env.SQL_SERVER}`);

        workingSheet[0].data.slice(1).forEach(async (row, index) => {
            if (/^[0-9]+$/.test(row[1])) {
                await new sql.Request().query(`SELECT COUNT(1) FROM LotBox WHERE SerialNo=${row[1]}`, (err, result) => {
                    if (!result) {
                        // console.log(`${row[1]} was not found from row ${index + 2}`);
                        invalidRows.push(row);
                    }
                });
            } else if (/^[0-9]+-[0-9]+$/.test(row[1])) {
                await new sql.Request().query(`SELECT COUNT(1) FROM pressrec WHERE SO_NUM='${row[1].split('-')[0]}' AND WO_NUM=${row[1].split('-')[1]}`, (err, result) => {
                    if (!result) {
                        // console.log(`${row[1]} was not found from row ${index + 2}`);
                        invalidRows.push(row);
                    }
                });
            } else {
                // console.log(`${row[1]} was not found from row ${index + 2}`);
                invalidRows.push(row);
                console.log(invalidRows);
            }
        });
    });

    await sql.close();

    console.log(invalidRows);

    return invalidRows;
};
