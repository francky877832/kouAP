const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

//modele pour les notificaitons
//
const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true,},
  description: {type: String, required: true,},
  position: { type: String, enum: ["Assistant Professor", "Associate Professor", "Professor"], required: true, },
  faculty: {type: String, required: true,},
  department: { type: String, required: true, },
  deadline: { type: Date, required: true, },
  createdAt: { type: Date, default: Date.now,},
});


module.exports = mongoose.model("Announcement", announcementSchema);;


