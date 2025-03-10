const mongoose = require('../../shared/db').mongoose;

const User = require('../models/userModel');

const ObjectId = mongoose.Types.ObjectId;
const { Types } = mongoose;

const Coef = require("../models/coefModel");

// 🔹 Récupérer tous les coefs
exports.getAllCoefs = async (req, res) => {
    try {
        const coefs = await Coef.find();
        res.status(200).json({message:'success', data:coefs});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Récupérer un coef par ID
exports.getCoefById = async (req, res) => {
    try {
        const coef = await Coef.findById(req.params.id);
        if (!coef) return res.status(404).json({ message: "Coef introuvable" });
        res.status(200).json({message:'success', data : coef});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Ajouter un coef
exports.createCoef = async (req, res) => {
    try {
        const newCoef = new Coef(req.body);
        await newCoef.save();
        res.status(201).json({message:'success', data:newCoef});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Modifier un coef
exports.updateCoef = async (req, res) => {
    try {
        const updatedCoef = await Coef.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCoef) return res.status(404).json({ message: "Coef introuvable" });
        res.status(200).json({message:'success', data:updatedCoef});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Supprimer un coef
exports.deleteCoef = async (req, res) => {
    try {
        const deletedCoef = await Coef.findByIdAndDelete(req.params.id);
        if (!deletedCoef) return res.status(404).json({ message: "Coef introuvable" });
        res.status(200).json({ message: "Coef supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
