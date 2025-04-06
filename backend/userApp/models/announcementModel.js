const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./userModel');
const Faculty = require('./facultyModel');
const facultyGroupModel = require('./facultyGroupModel');

//
const db = mongoose.connection.useDb("kouap");


const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true},
  description: {type: String, required: true},
  position: { type: String, enum: [1,2,3], required: true},
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: facultyGroupModel, required: true },
  department: { type: String, required: false },
  deadline: { type: Date, required: true },
  status : { type : String, enum:['pending', 'done'], default:'pending'},
  startingDate: { type: Date, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
}, { timestamps: true });

module.exports = db.model("Announcement", announcementSchema);



