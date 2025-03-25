const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');


const db = mongoose.connection.useDb("kouap");

// Définition du schéma utilisateur
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  surname: { type: String, required: false, trim: true },
  tcID: { type: String, required: true, trim: true },
  birthDate: { type: Date, required: true, trim: true },

  username: { type: String, required: false, trim: true },


  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phoneNumber: { type: String, required: true, trim: true },
  address: { type: String, required: true, },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'jury', 'manager', 'dev'], default: 'user' },
  cv : { type: String, required: function(){ return this.role=='user'} },

  location: { type: String, required: false, trim: true },


  //title: { type: String, enum: ["Candidate", "Assistant Professor", "Associate Professor", "Professor"], required: false, },
  createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});



userSchema.plugin(uniqueValidator);

module.exports = db.model("User", userSchema);