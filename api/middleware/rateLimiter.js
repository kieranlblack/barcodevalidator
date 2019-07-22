const rateLimit = require('express-rate-limit');

module.exports.getRateLimiter = function (window, max) {
    return rateLimit({
        handler(req, res) {
            res.status(429).end();
        },
        max,
        windowMs: window,
    });
};
