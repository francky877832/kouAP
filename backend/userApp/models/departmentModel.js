const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../models/userModel')
const Faculty = require('../models/facultyModel')
const db = mongoose.connection.useDb("kouap");



const DepartmentSchema = new mongoose.Schema({
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: Faculty, required: true },
    name: { type: String, required: true },
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
  });

module.exports = db.model("Department", DepartmentSchema)