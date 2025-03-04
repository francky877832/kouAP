const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../models/userModel')
const Faculty = require('../models/facultyModel')
const Activity = require('../models/activityModel')
const db = mongoose.connection.useDb("kouap");

const MinActivitySchema = new mongoose.Schema({
    activity: { type: mongoose.Schema.Types.ObjectId, ref: Activity, default: null },
    range: { type: Boolean, required: true },
    from: { type: Number, required: function () { return this.range; } },
    to: { type: Number, required: function () { return this.range; } },
    criteria: { type: String, required: function () { return !this.range; } },
    positions: [{
      position: { type: Number, enum: [0, 1, 2], required: true },
      quantity: { type: Number, required: true },
      faculty: { type: mongoose.Schema.Types.ObjectId, ref: Faculty, required: true },
    }],
});


module.exports = mongoose.model("MinActivity", MinActivitySchema);