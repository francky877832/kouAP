const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./userModel');
const Announcement = require("./announcementModel");

//modele pour les notificaitons
//
const db = mongoose.connection.useDb("kouap");



const applicationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: User, required: true }, // Candidat qui soumet l'application
  categories: { type: Map, of: Schema.Types.Mixed, required: true }, // Utilisation de Map pour des clés dynamiques
  submittedOn: { type: Date, default: Date.now }, // Date de soumission
  announcement :  { type: Schema.Types.ObjectId, ref: Announcement, required: false }, //false for test
  titleToNote  :  { type: String, required: false },
  comment  :  { type: String, required: false },
  status: { 
      type: String, 
      enum: ['pending', 'processing', 'approved', 'rejected'], 
      default: 'pending' 
  }, // Statut de l'application
  jurys: [{ type: Schema.Types.ObjectId, ref: User }], // Liste des jurés associés
  admin: { type: Schema.Types.ObjectId, ref: User, required: function(){return this.status!='pending' } },
  applicationDocument: {type:String, require:false}, 

  createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now }
});



const fieldsToConvert = ["cases"]; // Ajoute les champs à convertir

applicationSchema.pre("save", function (next) {
  for (const key of this.categories.keys()) {
    this.categories.set(
      key,
      this.categories.get(key).map((obj) => {
        let newObj = { ...obj };
        for (const field of fieldsToConvert) {
          if (newObj[field] && typeof newObj[field] === "string") {
            newObj[field] = new mongoose.Types.ObjectId(newObj[field]);
          }
        }
        return newObj;
      })
    );
  }
  next();
});


module.exports = db.model('Application', applicationSchema);
