const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const db = mongoose.connection.useDb("kouap");

// Définition du schéma utilisateur
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  surnname: { type: String, required: true, trim: true },
  tcID: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true, trim: true },
  address: { type: String, required: true, },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  title: { type: String, enum: ["Assistant Professor", "Associate Professor", "Professor"], required: true, },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
});



userSchema.plugin(uniqueValidator);

module.exports = db.model("User", userSchema);