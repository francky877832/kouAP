const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = require('../models/userModel')
const Activity = require('../models/activityModel')
const Case = require('../models/caseModel')
const Coef = require('./coefModel')



const db = mongoose.connection.useDb("kouap");



const FormSchema = new mongoose.Schema({
    activity: { type: mongoose.Schema.Types.ObjectId, ref: Activity, default: null },
    letter: { type: String, required: true, unique: true },
    case :{ type: mongoose.Schema.Types.ObjectId, ref: Case, default: null },
    coef :{ type: mongoose.Schema.Types.ObjectId, ref: Coef, default: null },
    fields : [
        {
            name: { type: String, required: true },
            label: { type: String, required: true },
            type: { type: String, required: true },
            options: { type: [String], required: false },
        }
    ],
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});

module.exports = db.model("Form", FormSchema);