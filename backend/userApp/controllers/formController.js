const Form = require('../models/formModel');
const mongoose = require('mongoose');

// Créer un nouveau formulaire
exports.createForm = async (req, res) => {
    //console.log("ok")
    try {
        const form = new Form(req.body);
        await form.save();
        res.status(201).json({message:"success", data:form});
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
};

// Récupérer tous les formulaires
exports.getForms = async (req, res) => {
    try {
        const forms = await Form.find().populate('activity');
        console.log(forms)
        res.status(200).json({message:'success', data:forms});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un formulaire par ID
exports.getFormById = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id).populate('activity');
        if (!form) {
            return res.status(404).json({ message: 'Formulaire non trouvé' });
        }
        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un formulaire
exports.updateForm = async (req, res) => {
    //console.log("ok")
    try {
        const form = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!form) {
            return res.status(404).json({ message: 'Formulaire non trouvé' });
        }
        res.status(200).json({message:"success", data:form});
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
};

// Supprimer un formulaire
exports.deleteForm = async (req, res) => {
    try {
        const form = await Form.findByIdAndDelete(req.params.id);
        if (!form) {
            return res.status(404).json({ message: 'Formulaire non trouvé' });
        }
        res.status(200).json({ message: 'Formulaire supprimé avec succès' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};
