const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var habitEntries = new Schema({
    habit_id: {type: ObjectId, required: true},
    user_id: {type: ObjectId, required: true},
    name: {type: String, required: true},
    date: {type: Number, required: true},
    status: {type: String, required: true},
});

module.exports = mongoose.model('habitEntries', habitEntries);