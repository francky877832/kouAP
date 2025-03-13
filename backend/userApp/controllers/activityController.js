
const Activity = require('../models/activityModel');

const mongoose = require('../../shared/db').mongoose;

const User = require('../models/userModel');

const ObjectId = mongoose.Types.ObjectId;
const { Types } = mongoose;

// Créer une nouvelle activité
exports.createActivity = async (req, res) => {
    try {
        const { letter, name, number, points, label, activities } = req.body;

        
       /* if(activities)
        {
            const newActivity = new Activity({ letter, label, activities });
            const savedActivity = await newActivity.save();

            return res.status(201).json({ message: "Nouvelle activité créée.", data: savedActivity });
        }
        else*/
      
        if (!letter || !label || !activities) {
            return res.status(400).json({ error: "Tous les champs sont requis." });
        }
        
        let existingActivity = await Activity.findOne({ letter });

        if (existingActivity) {
            // Vérifie si l'activité existe déjà dans le tableau
            const isDuplicate = activities.some(newAct =>
                existingActivity.activities.some(act => act.name === newAct.name)
              );
              
              if (isDuplicate) {
                return res.status(400).json({ error: "Une ou plusieurs activités existent déjà." });
              }

            // Ajoute la nouvelle activité
           // existingActivity.activities.push({ number, name, points });
            existingActivity.activities.push(...activities);
            await existingActivity.save();

            return res.status(200).json({ message: "Activité ajoutée avec succès.", data: existingActivity });
        } else {
            // Crée un nouvel objet si la lettre n'existe pas encore
            const newActivity = new Activity({ letter, label, activities });
            const savedActivity = await newActivity.save();

            return res.status(201).json({ message: "Nouvelle activité créée.", data: savedActivity });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};




/*
exports.createActivity = async (req, res, next) => {
    //console.log(req.body)
    try {
        const { letter, name, number, label, points } = req.body;

        if (!letter || !name || !number || !label || !points) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        const newActivity = new Activity({ letter, label, activities:[{number, name, points}] });
        const savedActivity = await newActivity.save();

        res.status(201).json({ message: "success", activity: savedActivity });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
*/




// Récupérer toutes les activités
exports.getAllActivities = async (req, res) => {
    try {
       // console.log("okok")
        const activities = await Activity.find();
        res.status(200).json({message:"success", data:activities});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};




// Controller pour la mise à jour d'une activité
exports.updateActivity = async (req, res, next) => {
//console.log("dac")
  const { letter, label, activities } = req.body; // Récupération des données envoyées par le client
  const { activityId } = req.params

  // Vérifier si les données nécessaires sont présentes
  if (!letter || !label) {
    console.log('La lettre et le libellé sont requis.')
    return res.status(400).json({ message: 'La lettre et le libellé sont requis.' });
  }

  try {
    // Mise à jour de l'activité principale
    const updatedActivity = await Activity.findByIdAndUpdate(
        activityId,
      { letter, label, activities },
      { new: true } // Cela permet de renvoyer l'objet mis à jour après la modification
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activité introuvable.' });
    }

    // Retourner la réponse avec l'activité mise à jour
    res.status(200).json({message:"success", data:updatedActivity});
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'activité.' });
  }
};






// Supprimer une activité
exports.deleteActivity = async (req, res) => {
    try {
        const { activityId } = req.params
        const activity = await Activity.findByIdAndDelete(activityId);
        if (!activity) {
            return res.status(404).json({ message: "Activité non trouvée" });
        }

        res.status(200).json({ message: "Activité supprimée avec succès" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};






// Récupérer une activité par ID
exports.getActivityById = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: "Activité non trouvée" });
        }
        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

