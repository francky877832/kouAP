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
      enum: ['pending', 'processing', 'approved', 'rejected'], 
      default: 'pending' 
  }, // Statut de l'application
  jurys: [{ type: Schema.Types.ObjectId, ref: User }], // Liste des jurés associés
  admin: { type: Schema.Types.ObjectId, ref: User, required: function(){return this.status!='pending' } }, 

  createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});


module.exports = mongoose.model('Application', applicationSchema);
