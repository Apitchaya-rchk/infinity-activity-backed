const express = require('express'); // *
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config =require('./config');

const userRouter = require('./routes/user.js');
const recordRouter = require('./routes/record.js');

const app = express(); //*

app.use(bodyParser.json());

// แบบมี users
// app.use('/users',userRouter);
app.use('/records', recordRouter);


const boot = async () => {
    // connext to mongodb
    await mongoose.connect(config.uri);

    // start express server
    app.listen(4000, () => {
        console.log('Server is running')
    });

};

boot();



