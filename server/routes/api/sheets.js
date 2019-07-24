const express = require('express');

const fs = require('fs');

const { checkSheet } = require('../../util/sheetChecker');
const { getRateLimiter } = require('../../middleware/rateLimiter');

const router = express.Router();

const rateLimiter = getRateLimiter(60 * 1000, 10);

// GET /api/sheets/:name
router.get('/:name', rateLimiter, async (req, res) => {
    const path = `./attachments/${req.params.name}.xls`;

    fs.access(path, fs.F_OK, (err) => {
        if (err) res.status(404).end();
    });

    const invalidRows = await checkSheet(path);

    if (invalidRows) {
        res.json(invalidRows);
        res.status(200).end();
    } else {
        res.status(400).end();
    }
});

// GET /api/sheets
router.get('/', rateLimiter, async (req, res) => {
    fs.readdir('./attachments', (err, items) => {
        if (err) {
            console.log(new Error(err));
            res.status(400).end();
        } else {
            res.json(items.map(item => ({
                name: item.split('.')[0],
            })));
        }
    });
});

// DELETE /api/sheets/:name
router.delete('/:name', rateLimiter, async (req, res) => {
    const path = `./attachments/${req.params.name}.xls`;

    fs.access(path, fs.F_OK, (err) => {
        if (err) res.status(404).end();
    });

    fs.unlink(path, (err) => {
        if (err) {
            console.log(new Error(err));
            res.status(400).end();
        } else res.status(200).end();
    });
});

module.exports = router;
