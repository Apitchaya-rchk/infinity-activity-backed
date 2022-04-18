const express = require('express');

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
        _id: 3,
        title: "Swimming practice for the shooting of a new movie.",
        activity: "Swim",
        location: "Tiger Gym",
        date: "15/02/2022",
        duration: { hour: 2, mins: 0 },
        description: " I really like the gym's pool here. But sometimes I feel that the gym owner looks at me strangely. Maybe he thinks I'm cool."
    },
    {
        _id: 4,
        title: "Hiking in the Rain and Enjoying it.",
        activity: "Hike",
        location: "Cake Mountain",
        date: "16/02/2022",
        duration: { hour: 3, mins: 47 },
        description: "Though rain can be annoying at the time of hiking I can still make it enjoyable and enjoy the sights, sounds, and smells. Here are some ways to hike in the rain and enjoy the rain."
    },
    {
        _id: 5,
        title: "I'm so tired, I need help",
        activity: "Bicycle ride",
        location: "Cake Mountain",
        date: "16/02/2022",
        duration: { hour: 0, mins: 45 },
        description: "That's a bike!! I feel like I've been exercising a lot today. But to be honest, I'm a person who doesn't like exercising much. I've been interviewed in one program before. I'm so handsome now if I were more handsome. The girls can't stand it."
    }
]

router.get('/', (req, res, next) => {
    res.send(exampleRecords);
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
router.post('/', (req, res, next) => {
    const params = req.params;
    const query = req.query;
    const body = req.body;
    console.log(body);
    // Validate
    if (!(typeof req.body.activity === 'string' && req.body.activity.length > 0)) {
        //failed validation
        return res.status(400).send('Invalid activity type');
    }

    const newRecord = {
        _id: Math.floor(Math.random() * 100000).toString(),
        ...body,
    };
    exampleRecords.push(newRecord);
    return res.status(201).send(newRecord);
});
router.put('/:recordId', (req, res, next) => {

});
router.delete('/:recordId', (req, res, next) => { });

module.exports = router;