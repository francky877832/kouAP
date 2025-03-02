const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const supplyTransactionsSchema = new Schema({
    from : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    to : { type: Schema.Types.ObjectId, ref: 'User', required: true },

    date : { type : Date, default : Date.now },
    amount : {type : Number},

    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});

supplyTransactionsSchema.plugin(uniqueValidator);

module.exports = mongoose.model('SupplyTransactions', supplyTransactionsSchema);