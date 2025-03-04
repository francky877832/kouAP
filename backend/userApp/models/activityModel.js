const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../models/userModel')
const Faculty = require('../models/facultyModel')
const db = mongoose.connection.useDb("kouap");



const ActivitySchema = new mongoose.Schema({
    letter: { type: String, enum: "A B C D E F G H I J K L".split(" "), required: true },
    label: { type: String, required: true },
    activities: [{
      number: { type: Number, required: true },
      name: { type: String, required: true },
      points: { type: Number, required: true },
    }],
});


module.exports = db.model("Activity", ActivitySchema);