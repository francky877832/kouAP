const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const db = mongoose.connection.useDb("kouap");



const CoefSchema = new mongoose.Schema({

    number: { type: Number, required: true, unique: true }, //number of a person
    coef:  { type: Number, required: true },
    factor:  { type: Number, required: true },
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});

module.exports = db.model("Coef", CoefSchema);