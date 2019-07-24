const express = require('express');

const fs = require('fs');

const { checkSheet } = require('../../util/sheetChecker');
const { getRateLimiter } = require('../../middleware/rateLimiter');

const router = express.Router();

const rateLimiter = getRateLimiter(60 * 1000, 10);

// GET /api/sheets/:name
router.get('/:name', rateLimiter, async (req, res) => {
    const invalidRows = await checkSheet(`./attachments/${req.params.name}.xls`);

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
                    dateModified: 'TODO',
                })));

            res.status(200);
        }
    });
});

// DELETE /api/sheets/:name
router.delete('/:name', rateLimiter, async (req, res) => {
    fs.unlink(`./attachments/${req.params.name}.xls`, (err) => {
        if (err) {
            console.log(new Error(err));
            res.status(400).end();
        } else res.status(200).end();
    });
});

module.exports = router;
