const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

const User = require('./userModel');

//modele pour les notificaitons
//
const db = mongoose.connection.useDb("kouap");


const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true,},
  description: {type: String, required: true,},
  position: { type: String, enum: ["Assistant Professor", "Associate Professor", "Professor"], required: true, },
  faculty: {type: String, required: true,},
  department: { type: String, required: true, },
  deadline: { type: Date, required: true, },
  startingDate: { type: Date, required: true, },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  createdAt: { type: Date, default: Date.now,},
});

module.exports = db.model("Announcement", announcementSchema);;


