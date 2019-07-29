// eslint-disable-next-line
const dotenv = require('dotenv').config();
const express = require('express');

const fs = require('fs');

const { checkSheet } = require('../../util/sheetChecker');
const { getRateLimiter } = require('../../middleware/rateLimiter');

const router = express.Router();

const path = process.env.ATTACH_PATH ? process.env.ATTACH_PATH : './attachments/';

const rateLimiter = getRateLimiter(60 * 1000, 60);

// GET /api/sheets
router.get('/', rateLimiter, async (req, res) => {
    fs.readdir(path, (err, items) => {
        if (err) {
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
    fs.access(`${path}${req.params.fullName}`, fs.F_OK, (err) => {
        if (err) res.status(404).end();
    });

    res.sendFile(req.params.fullName, { root: process.env.ATTACH_PATH ? process.env.ATTACH_PATH : `${__dirname}\\..\\..\\attachments` }, (err) => {
        if (err) res.status(400).end();
        res.status(200).end();
    });
});

// DELETE /api/sheets/:fullName
router.delete('/:fullName', rateLimiter, async (req, res) => {
    fs.access(`${path}${req.params.fullName}`, fs.F_OK, (err) => {
        if (err) res.status(404).end();
    });

    fs.unlink(`${path}${req.params.fullName}`, (err) => {
        if (err) {
            res.status(400).end();
        } else res.status(200).end();
    });
});

// GET /api/sheets/:fullName/data
router.get('/:fullName/data', rateLimiter, async (req, res) => {
    req.setTimeout(60000);

    fs.access(`${path}${req.params.fullName}`, fs.F_OK, (err) => {
        if (err) res.status(404).end();
    });

    const invalidRows = await checkSheet(`${path}${req.params.fullName}`);

    if (invalidRows) {
        res.json(invalidRows);
        res.status(200).end();
    } else {
        res.status(400).end();
    }
});

module.exports = router;
