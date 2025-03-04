
const Activity = require('../models/activityModel');

const mongoose = require('../../shared/db').mongoose;

const User = require('../models/userModel');

const ObjectId = mongoose.Types.ObjectId;
const { Types } = mongoose;

// Créer une nouvelle activité
exports.createActivity = async (req, res, next) => {
    //console.log('okok')
    try {
        const { letter, name, number, label, points } = req.body;

        if (!letter || !name || !number || !label || !points) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        const newActivity = new Activity({ letter, label, activities:[{number, name, points}] });
        await newActivity.save();

        res.status(201).json({ message: "success", activity: newActivity });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};




// Récupérer toutes les activités
exports.getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
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

// Mettre à jour une activité
exports.updateActivity = async (req, res) => {
    try {
        const { letter, name, activities } = req.body;
        const updatedActivity = await Activity.findByIdAndUpdate(
            req.params.id,
            { letter, name, activities },
            { new: true, runValidators: true }
        );

        if (!updatedActivity) {
            return res.status(404).json({ message: "Activité non trouvée" });
        }

        res.status(200).json({ message: "Activité mise à jour avec succès", activity: updatedActivity });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// Supprimer une activité
exports.deleteActivity = async (req, res) => {
    try {
        const activity = await Activity.findByIdAndDelete(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: "Activité non trouvée" });
        }

        res.status(200).json({ message: "Activité supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

