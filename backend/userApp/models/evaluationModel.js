const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = require('../models/userModel')
const Application = require('../models/applicationModel')
const db = mongoose.connection.useDb("kouap");


const evaluationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: User, required: true }, // Évaluateur principal
  application: { type: Schema.Types.ObjectId, ref: Application, required: true }, // Application évaluée
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending', required:true },
  jurys: [
    {
        decision: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
        summary: { type: String },
        report: { type: String },
        jury: { type: Schema.Types.ObjectId, ref: User, required: false } // Membre du jury
    }
  ],
  createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});

// Ajoute un validateur personnalisé sur le tableau jurys pour garantir l'unicité de `jury`
evaluationSchema.path('jurys').validate(function(value) {
  const juryIds = value.map(j => j.jury.toString()); // Récupère tous les IDs de jury
  const uniqueJuryIds = new Set(juryIds); // Crée un Set avec les IDs (les valeurs dupliquées seront supprimées)
  return juryIds.length === uniqueJuryIds.size; // Si la taille est égale, il n'y a pas de duplicata
}, 'Chaque jury ne peut être évalué qu’une seule fois.');

const Evaluation = db.model('Evaluation', evaluationSchema);
module.exports = Evaluation;
