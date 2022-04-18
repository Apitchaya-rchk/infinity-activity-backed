const express = require('express');

const RecordModel = require('../models/record');

const router = express.Router();

const exampleRecords = [
    {
        _id: "1",
        title: "Take a walk around Yaowarat with my girlfriend.",
        activity: "Walk",
        location: "Chinatown Yaowarach",
        date: "13/02/2022",
        duration: { hour: 1, mins: 30 },
        description: "<p><strong>123</strong> a long and big street. I find chinese restaurant, cheap and delicious. a lot of souvenir shop and mixed up with fruit stall, clothes, etc. 👗👘🍑🍎🍒🍏🍋</p>"
    }

    ,
    {
        _id: "2",
        title: "Day 10 of running training for the marathon.",
        activity: "Run",
        location: "Lumpini Park",
        date: "14/02/2022",
        duration: { hour: 0, mins: 45 },
        description: "Today, I was able to run my scheduled distance and spent less time running the entire run. feel so fresh."
    },
    {
        _id: "3",
        title: "Swimming practice for the shooting of a new movie.",
        activity: "Swim",
        location: "Tiger Gym",
        date: "15/02/2022",
        duration: { hour: 2, mins: 0 },
        description: " I really like the gym's pool here. But sometimes I feel that the gym owner looks at me strangely. Maybe he thinks I'm cool."
    },
    {
        _id: "4",
        title: "Hiking in the Rain and Enjoying it.",
        activity: "Hike",
        location: "Cake Mountain",
        date: "16/02/2022",
        duration: { hour: 3, mins: 47 },
        description: "Though rain can be annoying at the time of hiking I can still make it enjoyable and enjoy the sights, sounds, and smells. Here are some ways to hike in the rain and enjoy the rain."
    },
    {
        _id: "5",
        title: "I'm so tired, I need help",
        activity: "Bicycle ride",
        location: "Cake Mountain",
        date: "16/02/2022",
        duration: { hour: 0, mins: 45 },
        description: "That's a bike!! I feel like I've been exercising a lot today. But to be honest, I'm a person who doesn't like exercising much. I've been interviewed in one program before. I'm so handsome now if I were more handsome. The girls can't stand it."
    }
]

router.use('/:recordId', async (req, res, next) => {
    const recordId = req.params.recordId;
    // Check if recordId is a valid mongodb objectId
    if (recordId && !recordId.match(/^[0-9a-fA-F]{24}$/)) {
        // You can response 400 too since client should request with valid it
        // But this way it's easier to handle status code
        return res.status(404).send('Record not found');
    }
    const foundRecord = await RecordModel.findById(recordId);
    if (!foundRecord) {
        return res.status(404).send('Record not found');
    }
    req.record = foundRecord;
    req.recordIndex = index;
    return next();
});

router.get('/', async (req, res, next) => {
    const records = await RecordModel.find({});
    res.send(records);
});
router.get('/:recordId', (req, res, next) => {
    const recordId = Number(req.params.recordId);
    const index = exampleRecords.findIndex((record) => record._id === recordId);
    const foundRecord = exampleRecords[index];
    if (!foundRecord) {
        return res.status(404).send('Record not found');
    }
    return res.send(foundRecord);
});

router.post('/', async (req, res, next) => {
    const body = req.body;

    const newRecord = new RecordModel(body);

    const errors = newRecord.validateSync();
    if (errors) {
        const errorFieldNames = Object.keys(errors.errors);
        if (errorFieldNames.length > 0) {
            return res.status(400).send(errors.errors[errorFieldNames[0]].message);
        }
    }

    await newRecord.save();

    return res.status(201).send(newRecord);
});

router.put('/:recordId', (req, res, next) => {
    
    // RecordModel

    // const recordId = Number(req.params.recordId);
    // const index = exampleRecords.findIndex((record) => record._id === recordId);
    // const foundRecord = exampleRecords[index];
    // if (!foundRecord) {
    //     return res.status(404).send('Record not found');
    // }
    // return res.send(foundRecord);

    return res.status(501).send('Not implemented');
});

router.delete('/:recordId', async (req, res, next) => {
    await RecordModel.deleteOne({ _id: req.params.recordId });
    return res.status(204).send();
});

module.exports = router;