const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../models/userModel')
const Application = require('../models/applicationModel')
const db = mongoose.connection.useDb("kouap");


const evaluationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: User, required: true }, // Évaluateur principal
  application: { type: Schema.Types.ObjectId, ref: Application, required: true }, // Application évaluée
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  jurys: [
    {
        decision: { type: String, enum: ['approved', 'rejected'], default: 'pending' },
        summary: { type: String },
        report: { type: String },
        jury: { type: Schema.Types.ObjectId, ref: User, required: true } // Membre du jury
    }
  ]
});

const Evaluation = db.model('Evaluation', evaluationSchema);
module.exports = Evaluation;
