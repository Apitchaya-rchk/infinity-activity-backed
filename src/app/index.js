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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// app.use(
//     cors({
//       origin: '*',
//       optionsSuccessStatus: 200,
//     })
//   );

app.use('/records', recordRouter);

module.exports = app;