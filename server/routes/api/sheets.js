const express = require('express');

const fs = require('fs');

const { checkSheet } = require('../../util/sheetChecker');
const { getRateLimiter } = require('../../middleware/rateLimiter');

const router = express.Router();

const rateLimiter = getRateLimiter(60 * 1000, 60);

// GET /api/sheets
router.get('/', rateLimiter, async (req, res) => {
    fs.readdir('./attachments', (err, items) => {
        if (err) {
            console.log(new Error(err));
            res.status(400).end();
        } else {
            res.json(items.map(item => ({
                name: item.split('.')[0],
                fullName: item,
            })));
        }
    });
});

// GET /api/sheets/:fullName
router.get('/:fullName', rateLimiter, async (req, res) => {
    fs.access(`./attachments/${req.params.fullName}`, fs.F_OK, (err) => {
        if (err) res.status(404).end();
    });

    res.sendFile(req.params.fullName, { root: `${__dirname}\\..\\..\\attachments` }, (err) => {
        if (err) res.status(400).end();
        res.status(200).end();
    });
});

// DELETE /api/sheets/:fullName
router.delete('/:fullName', rateLimiter, async (req, res) => {
    const path = `./attachments/${req.params.fullName}`;

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

// GET /api/sheets/:fullName/data
router.get('/:fullName/data', rateLimiter, async (req, res) => {
    req.setTimeout(60000);

    const path = `./attachments/${req.params.fullName}`;

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

module.exports = router;
