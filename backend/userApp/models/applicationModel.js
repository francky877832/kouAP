const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema

const User = require('./userModel');

//modele pour les notificaitons
//
const db = mongoose.connection.useDb("kouap");



const applicationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: User, required: true }, // Candidat qui soumet l'application
  categories: { type: Map, of: Schema.Types.Mixed, required: true }, // Utilisation de Map pour des clés dynamiques
  submittedOn: { type: Date, default: Date.now }, // Date de soumission
  status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' 
  }, // Statut de l'application
  jurys: [{ type: Schema.Types.ObjectId, ref: User }], // Liste des jurés associés
  createdAt : {type:Date, defaut:Date.now}
});


module.exports = mongoose.model('Application', applicationSchema);
