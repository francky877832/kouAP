const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const db = mongoose.connection.useDb("kouap");

// Définition du schéma utilisateur
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  surnname: { type: String, required: false, trim: true },
  tcID: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phoneNumber: { type: String, required: true, trim: true },
  address: { type: String, required: true, },
  password: { type: String, required: true },
  title: { type: String, enum: ["Assistant Professor", "Associate Professor", "Professor"], required: false, },
  role: { type: String, enum: ['user', 'admin', 'jury', 'manager'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
});



userSchema.plugin(uniqueValidator);

module.exports = db.model("User", userSchema);