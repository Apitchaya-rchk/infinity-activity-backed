const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const config = require('../config');
const PORT = config.port;

const recordRouter = require('../routes/record.js');

const app = express(); 

if (config.isVercel) {
    app.use(async (req, res, next) => {
      await mongoose.connect(config.mongoUri, config.mongoOptions);
      return next();
    });
  }

app.use(bodyParser.json());

app.use(
    cors({
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
    })
  );

app.use('/records', recordRouter);

module.exports = app;