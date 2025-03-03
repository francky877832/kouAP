const Evaluation = require("../models/evaluationModel");
const Application = require("../models/applicationModel");
const User = require("../models/userModel");

// Créer une nouvelle évaluation avec des jurys et des documents
exports.createEvaluation = async (req, res) => {
  try {
   
    const { user, application, decision, summary, report, jury } = req.body;
    const { applicationId } = req.params
    console.log(req.body)

    const file = req.file; // Multer renvoie les fichiers sous forme d'un objet
    //console.log(decision)
    // Vérifier si l'utilisateur et l'application existent
    const userExists = await User.findById(user);
    const juryExists = await User.findById(jury);
    if (!userExists || !juryExists) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    

    const newJurys = {
        decision : decision.toLowerCase(),
        summary: summary || '',
        report: file.path || '',
        jury: jury,
    }
    //console.log(applicationId)
   const newEvaluation = await Evaluation.find({application : applicationId});
   //console.log(newEvaluation)

    if (newEvaluation.length===0) 
    {
        //console.log("Var")
        const newEv = new Evaluation({
            user,
            application : applicationId,
            status : 'pending',
            jurys : [newJurys,],
        })
        newEv.save()
        return res.status(201).json({ message: "success", newEv });
    }
    else
    {
        //console.log("newEvaluation")
        newEvaluation[0].jurys.push(newJurys );
        await newEvaluation[0].save();
        res.status(201).json({ message: "Évaluation soumise avec succès", newEvaluation });
    }
    
  } catch (error) {
    console.error("Erreur lors de la soumission de l'évaluation:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Mettre à jour une évaluation et ajouter un rapport à un jury spécifique
exports.updateEvaluation = async (req, res) => {
  try {
    const { status, summary, juryIndex } = req.body;
    const file = req.file ? req.file.path : null; // Fichier reçu via Multer

    const evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation) {
      return res.status(404).json({ error: "Évaluation non trouvée" });
    }

    // Vérifier si le jury existe dans l'évaluation
    if (!evaluation.jurys[juryIndex]) {
      return res.status(400).json({ error: "Jury non trouvé dans cette évaluation" });
    }

    // Mise à jour du jury spécifique
    if (status) evaluation.jurys[juryIndex].status = status;
    if (summary) evaluation.jurys[juryIndex].summary = summary;
    if (file) evaluation.jurys[juryIndex].report = file; // Met à jour le rapport

    await evaluation.save();

    res.json({ message: "Évaluation mise à jour", evaluation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir toutes les évaluations
exports.getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find()
      .populate("user application jurys.jury");
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir une évaluation par ID
exports.getEvaluationById = async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id)
      .populate("user application jurys.jury");

    if (!evaluation) {
      return res.status(404).json({ error: "Évaluation non trouvée" });
    }
    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une évaluation
exports.deleteEvaluation = async (req, res) => {
  try {
    const evaluation = await Evaluation.findByIdAndDelete(req.params.id);
    if (!evaluation) {
      return res.status(404).json({ error: "Évaluation non trouvée" });
    }
    res.json({ message: "Évaluation supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
