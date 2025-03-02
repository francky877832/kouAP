const mongoose = require('../../shared/db').mongoose;
const Application = require('../models/applicationModel');
const User = require('../models/userModel');


// ✅ 5. Récupérer les applications assignées à un jury
exports.getJuryApplications = async (req, res, next) => {

  console.log(req.params)
    try {
      const { juryId } = req.params;
  
      const applications = await Application.find()
        .populate('user')
        .populate('jurys')
        //.maxTimeMS(30000);
  
      res.status(200).json({message:"succes", data:applications});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération des applications du jury" });
    }
  };
  

// ✅ 1. Créer une nouvelle application
exports.createApplication = async (req, res) => {
  try {
    const { user, categories, submittedOn, status, jurys } = req.body;

    const newApplication = new Application({
      user,
      categories,
      submittedOn,
      status,
      jurys,
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de l'application" });
  }
};

// ✅ 2. Récupérer une application par ID
exports.getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id)
      .populate('user', 'name email')
      .populate('jurys', 'name email');

    if (!application) {
      return res.status(404).json({ message: "Application non trouvée" });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'application" });
  }
};

// ✅ 3. Mettre à jour une application
exports.updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedApplication = await Application.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application non trouvée" });
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'application" });
  }
};

// ✅ 4. Supprimer une application
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedApplication = await Application.findByIdAndDelete(id);

    if (!deletedApplication) {
      return res.status(404).json({ message: "Application non trouvée" });
    }

    res.status(200).json({ message: "Application supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'application" });
  }
};
