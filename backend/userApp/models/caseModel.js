const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const db = mongoose.connection.useDb("kouap");



const CaseSchema = new mongoose.Schema({

    number: { type: Number, required: true, unique: true }, //numero
    message: { type: String, required: true, unique: true },
    participants : [
        {
            title: { type: String, enum:['AD','LO1', 'LO2', 'ED','KYD', 'BY', 'IY', 'SY', 'EY', 'FIVE_PLUS', 'NONE_OF_THEM'], required: true },
            coef: { type: Number, required: true },
        }
    ],
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});

module.exports = db.model("Case", CaseSchema);