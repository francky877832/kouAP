const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../models/userModel')
const Application = require('../models/applicationModel')
const db = mongoose.connection.useDb("kouap");



const FacultySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

module.exports = db.model("Faculty", FacultySchema);