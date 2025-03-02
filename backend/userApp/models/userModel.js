const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['boss', 'admin', 'supplier', 'visualizer', 'cashier', 'auto-supplier'], default: 'cashier' },
    location : {type : String},

    cashBalance : {type : Number, default:0},

    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);