const express = require('express');

const { checkSheet } = require('../util/sheetChecker');
const { getRateLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

const rateLimiter = getRateLimiter(60 * 1000, 10);

// GET /invalids
// eslint-disable-next-line
router.get('/', rateLimiter, async (req, res, next) => {
    res.json(await checkSheet('./input2.xls'));

    res.status(200).end();
});

router.post('/reset', rateLimiter, async (req, res, next) => {

});

module.exports = router;
