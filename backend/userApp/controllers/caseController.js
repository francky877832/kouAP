const mongoose = require('../../shared/db').mongoose;

const User = require('../models/userModel');

const ObjectId = mongoose.Types.ObjectId;
const { Types } = mongoose;


const Case = require("../models/caseModel");

// 🔹 Récupérer toutes les cases
exports.getAllCases = async (req, res) => {
    try {
        const cases = await Case.find();
        res.status(200).json({message:'success', data:cases});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Récupérer une seule case
exports.getCaseById = async (req, res) => {
    try {
        const caseItem = await Case.findById(req.params.id);
        if (!caseItem) return res.status(404).json({ message: "Case introuvable" });
        res.status(200).json({message:'success', data : caseItem});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Ajouter une case
exports.createCase = async (req, res) => {
    try {
        console.log("Coef")
        const newCase = new Case(req.body);
        await newCase.save();
        res.status(201).json({message:'success', data:newCase});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Modifier une case
exports.updateCase = async (req, res) => {
    try {
        const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCase) return res.status(404).json({ message: "Case introuvable" });
        res.status(200).json({message:'success', data : updatedCase});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Supprimer une case
exports.deleteCase = async (req, res) => {
    try {
        const deletedCase = await Case.findByIdAndDelete(req.params.id);
        if (!deletedCase) return res.status(404).json({ message: "Case introuvable" });
        res.status(200).json({ message: "Case supprimée avec succès" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};
