const express = require('express');
const { json } = require('express');
const morgan = require('morgan');
const transactionRoutes = require('./routes/transaction.routes')

const app = express();

app.use(morgan('dev'));
app.use(json());

//routes

app.use('/api/', transactionRoutes)

app.set('port', 4500);

module.exports = app;