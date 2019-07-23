import axios from 'axios';

const url = 'http://localhost:3000/api/sheets/';

class SheetService {
    // GET a list of all sheets
    static getSheets() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);

                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    // GET the data for a single sheet
    static getSheetData(name) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}${name}`);

                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static deleteSheet(name) {
        return axios.delete(`${url}${name}`);
    }
}

export default SheetService;
