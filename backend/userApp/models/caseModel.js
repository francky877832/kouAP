const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const db = mongoose.connection.useDb("kouap");



const CaseSchema = new mongoose.Schema({

    number: { type: Number, required: true, unique: true }, //numero
    message: { type: String, required: true, unique: true },
    participants : [
        {
            title: { type: String, enum:["AD", "LO1", "LO2", "ED", "KYD", "BY1", "BY2", "BY3", "IY", "SY1", "SY2", "EY", "FIVE_PLUS", "NONE_OF_THEM"], required: true },
            coef: { type: Number, required: true },
            coef2: { type: Number, required: true, default:1 },
        }
    ],
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});

module.exports = db.model("Case", CaseSchema);