const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: [1, "title should not be blank"],
    },
    activity: { type: String },
    location: { type: String },
    date: { type: Date },
    duration: {
        hour: { type: Number, },
        mins: { type: Number, },
    },
    description: { type: String },
    
});

const RecordModel = mongoose.model('Record', recordSchema, 'records');

module.exports = RecordModel;