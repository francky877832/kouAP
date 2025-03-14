const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../models/userModel')
const Faculty = require('../models/facultyModel')
const Activity = require('../models/activityModel')

const FacultyGroup = require('../models/facultyGroupModel')


const db = mongoose.connection.useDb("kouap");


const MinPointSchema = new mongoose.Schema({
   activity: { type: mongoose.Schema.Types.ObjectId, ref: Activity, default: null },
    letter: { type: String, enum: "A B C D E F G H I J K L".split(" "), required: true },
    range: { type: Boolean, required: true },
    from: { type: Number, required: function () { return this.range; } },
    to: { type: Number, required: function () { return this.range; } },
    criteria: { type: String, required: function () { return !this.range; } },
     groups : [{
          faculty: { type: mongoose.Schema.Types.ObjectId, ref: FacultyGroup, required: true }, //modified
          positions: [{
            position: { type: Number, enum: [1, 2, 3], required: true },
            minPoint: { type: Number, required: true },
            maxPoint: { type: Number, required: true },
        }],
      }],
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
  });

module.exports = mongoose.model("MinPoint", MinPointSchema);