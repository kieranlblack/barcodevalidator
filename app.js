const helmet = require('helmet');
const morgan = require('morgan');

const express = require('express');

const app = express();

const createError = require('http-errors');

// #region third-party middleware

app.use(helmet());
app.use(morgan('common'));
app.use(express.json());

// #endregion third-party middleware

// #region routes

app.use('/invalids', require('./routes/invalids'));

// #endregion routes

// #region error-handling middleware

app.use((req, res, next) => next(createError(404)));

// eslint-disable-next-line
app.use((err, req, res, next) => {
    const status = err.status || 500;

    res.status(status).end();
});

// #endregion error-handling middleware

app.listen(3000);
