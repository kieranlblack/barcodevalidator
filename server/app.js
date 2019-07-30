const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const express = require('express');

const createError = require('http-errors');

const app = express();

// #region third-party middleware

app.use(helmet());
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

// #endregion third-party middleware

// #region routes

app.use('/api/sheets', require('./routes/api/sheets'));

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
