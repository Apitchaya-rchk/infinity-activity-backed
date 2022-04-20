const express = require('express');

const RecordModel = require('../models/record');

const router = express.Router();

router.use('/:recordId', async (req, res, next) => {
    const recordId = req.params.recordId;
    if (recordId && !recordId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).send('Record not found');
    }
    const foundRecord = await RecordModel.findById(recordId);
    if (!foundRecord) {
        return res.status(404).send('Record not found');
    }
    req.record = foundRecord;
    return next();
});

router.get('/', async (req, res, next) => {
    const records = await RecordModel.find({});
    res.send(records);
});

router.get('/:recordId', (req, res, next) => {
    return res.send(req.record);
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

router.put('/:recordId', async (req, res, next) => {
    const body = req.body;
    const updateRecord = new RecordModel(body);
    const errors = updateRecord.validateSync();
    if (errors) {
        const errorFieldNames = Object.keys(errors.errors);
        if (errorFieldNames.length > 0) {
            return res.status(400).send(errors.errors[errorFieldNames[0]].message);
        }
    }
    const { recordId } = req.params;
    const record = await RecordModel.findByIdAndUpdate(recordId, { $set: body });
    res.json(record);
});

router.delete('/:recordId', async (req, res, next) => {
    await RecordModel.deleteOne({ _id: req.params.recordId });
    return res.status(204).send();
});

module.exports = router;