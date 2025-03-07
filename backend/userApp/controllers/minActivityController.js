
const Activity = require('../models/activityModel');

const mongoose = require('../../shared/db').mongoose;

const User = require('../models/userModel');

const ObjectId = mongoose.Types.ObjectId;
const { Types } = mongoose;

const MinActivity = require("../models/minActivityModel");

// 📌 Créer une MinActivity
exports.createMinActivity = async (req, res, next) => {
    //console.log('okok')
    try {
       console.log(req.body)
       console.log(req.body.positions[0])

        //const activityId = "67c776634035a02db2ee38e0";
        const { /*activity*/ letter, range, from, to, criteria, position, quantity, faculty, positions} = req.body;
// 
        if ((range && (!from || !to || !letter)) || (!range && !criteria) || !faculty || !positions) {
            console.log("Tous les champs sont requis.")
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }
        /*const positions = {
            position,
            quantity,
            faculty,
        }*/
        console.log("req.body")

        const newActivity = new MinActivity({ letter, range, from, to, criteria, positions:positions });
        const savedActivity = await newActivity.save();
        console.log(savedActivity)
        res.status(201).json({ message: "success", activity: savedActivity });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};





// 📌 Récupérer toutes les MinActivities
exports.getAllMinActivities = async (req, res) => {
    try {
        const minActivities = await MinActivity.find().populate("activity").populate("positions.faculty");
        //console.log(minActivities)
        res.status(200).json({message:"success", data:minActivities});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

// 📌 Récupérer une seule MinActivity par ID
exports.getMinActivityById = async (req, res) => {
    try {
        const minActivity = await MinActivity.findById(req.params.id).populate("activity").populate("positions.faculty");
        if (!minActivity) {
            return res.status(404).json({ message: "MinActivity non trouvée" });
        }
        res.status(200).json(minActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 📌 Mettre à jour une MinActivity
exports.updateMinActivity = async (req, res) => {
    try {
        const updatedMinActivity = await MinActivity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMinActivity) {
            return res.status(404).json({ message: "MinActivity non trouvée" });
        }
        res.status(200).json(updatedMinActivity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 📌 Supprimer une MinActivity
exports.deleteMinActivity = async (req, res) => {
    try {
        const deletedMinActivity = await MinActivity.findByIdAndDelete(req.params.id);
        if (!deletedMinActivity) {
            return res.status(404).json({ message: "MinActivity non trouvée" });
        }
        res.status(200).json({ message: "MinActivity supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
