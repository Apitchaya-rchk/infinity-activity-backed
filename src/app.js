const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// require('dotenv').config();
const config =require('./config');
// const PORT = config.port;

const recordRouter = require('./routes/record.js');

const app = express(); 

app.use(bodyParser.json());

app.use(
    cors({
      origin: '*',
      optionsSuccessStatus: 200,
    })
  );

app.use('/records', recordRouter);

const boot = async () => {
    // connext to mongodb
    await mongoose.connect(config.mongoUri, config.mongoOptions);
    // start express server
    app.listen(4000, () => {
        console.log('Server is running')
    });
};
boot();



