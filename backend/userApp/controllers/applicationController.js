const mongoose = require('../../shared/db').mongoose;
const Application = require('../models/applicationModel');
const User = require('../models/userModel');
const evaluationController = require('../controllers/evaluationController')

//  5. Récupérer les applications assignées à un jury
exports.getApplications = async (req, res, next) => {

  //console.log("req.body")
    try {
  
      const applications = await Application.find({status:"pending"})
        .populate('user')
        .populate('jurys')
        //.maxTimeMS(30000);
        //console.log(applications)
  
      res.status(200).json({message:"succes", data:applications});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération des applications" });
    }
  };

//  5. Récupérer les applications assignées à un jury
exports.getJuryApplications = async (req, res, next) => {

  //console.log(req.params)
    try {
      const { juryId } = req.params;
  
      const applications = await Application.find({jurys : juryId})
        .populate('user')
        .populate('jurys')
        //.maxTimeMS(30000);
  
      res.status(200).json({message:"succes", data:applications});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération des applications du jury" });
    }
  };




exports.assignJuriesToApplication = async (req, res) => {
  try {
    const { applicationId, jurorsCount, adminId, userId} = req.body;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application non trouvée." });
    }

    // Récupérer toutes les applications et compter combien de fois chaque jury est assigné
    const allApplications = await Application.find({}, "jurys");
    const juryCounts = new Map(); // Stocke { jury_id: nombre_d_applications }

    allApplications.forEach(app => {
      app.jurys.forEach(juryId => {
        juryCounts.set(juryId.toString(), (juryCounts.get(juryId.toString()) || 0) + 1);
      });
    });

    // Récupérer tous les utilisateurs ayant le rôle "jury"
    const allJurors = await User.find({ role: "jury" });

    //  Séparer les jurys en deux groupes :
    let unassignedJurors = []; // Ceux qui ne sont assignés à aucune application
    let assignedJurors = [];   // Ceux qui sont déjà assignés

    allJurors.forEach(jury => {
      const count = juryCounts.get(jury._id.toString()) || 0;
      if (count === 0) {
        unassignedJurors.push(jury);
      } else {
        assignedJurors.push({ jury, count });
      }
    });

    //  Trier les jurys assignés par le nombre d'affectations (du moins au plus)
    assignedJurors.sort((a, b) => a.count - b.count);

    //  Sélectionner les jurys
    let selectedJurors = [];

    if (unassignedJurors.length >= jurorsCount) {
      // Si assez de jurés non assignés, on les prend en priorité
      selectedJurors = unassignedJurors.slice(0, jurorsCount);
    } else {
      // Sinon, on prend tous les jurés non assignés puis on complète avec les moins assignés
      selectedJurors = [
        ...unassignedJurors,
        ...assignedJurors.slice(0, jurorsCount - unassignedJurors.length).map(j => j.jury),
      ];
    }

    //  Mettre à jour l'application avec les jurys sélectionnés
    application.jurys = selectedJurors.map(jury => jury._id);
    application.status = 'processing';
    application.admin = adminId;
    await application.save();

    await evaluationController.createEvaluation({...req, params:{applicationId, userId}}, res)


    return res.status(200).json({ message: "Jurés assignés avec succès.", data:application });
  } catch (error) {
    console.error("Erreur lors de l'assignation des jurés:", error);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
};



exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params; // ID de l'application
    const { status } = req.body; // "approved" ou "rejected"

    // Vérification des valeurs autorisées
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Statut invalide. Utilisez 'approved' ou 'rejected'." });
    }

    // Trouver et mettre à jour l'application
    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application non trouvée." });
    }

    return res.status(200).json({ message: `Statut mis à jour avec succès : ${status}`, application });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    return res.status(500).json({ message: "Erreur interne du serveur." });
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
