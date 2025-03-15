const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../models/userModel')
const FacultyGroup = require('../models/facultyGroupModel')
const Activity = require('../models/activityModel')
const db = mongoose.connection.useDb("kouap");

const MinActivitySchema = new mongoose.Schema({
    activity: { type: mongoose.Schema.Types.ObjectId, ref: Activity, default: null },
    letter: { type: String, enum: "A B C D E F G H I J K L".split(" "), required: function () { return this.range; } },
    range: { type: Boolean, required: true },
    from: { type: Number, required: function () { return this.range; } },
    to: { type: Number, required: function () { return this.range; } },
    criteria: { type: String, required: function () { return !this.range; } },
    groups : [{
      faculty: { type: mongoose.Schema.Types.ObjectId, ref: FacultyGroup, required: true }, //modified
      positions: [{
        position: { type: Number, enum: [1, 2, 3], required: true },
        quantity: { type: Number, required: true },
      }],
    }],
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});


module.exports = mongoose.model("MinActivity", MinActivitySchema);