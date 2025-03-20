const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//const User = require('../models/userModel')
//const Application = require('../models/applicationModel')
const db = mongoose.connection.useDb("kouap");



const FacultySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});

module.exports = db.model("Faculty", FacultySchema);