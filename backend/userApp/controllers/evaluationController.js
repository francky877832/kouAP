const Evaluation = require("../models/evaluationModel");
const Application = require("../models/applicationModel");
const User = require("../models/userModel");

// Créer une nouvelle évaluation avec des jurys et des documents
exports.createEvaluation = async (req, res, next) => {
  try {
       //console.log(req.body)
       const { applicationId } = req.params
    const newEvaluation = await Evaluation.find({application : applicationId});
 
     if (newEvaluation.length===0) 
     {
      const { userId } = req.params
         const newEv = new Evaluation({
             user,
             application : applicationId,
             status : 'pending',
             jurys : [],
         })
         newEv.save()
         return res.status(201).json({ message: "success", newEv });
     }


     const { user, application, decision, summary, report, jury } = req.body;
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
  
   
        //console.log("newEvaluation")
        newEvaluation[0].jurys.push(newJurys );
        await newEvaluation[0].save();
        res.status(201).json({ message: "Évaluation soumise avec succès", newEvaluation });
    
    
  } catch (error) {
    console.error("Erreur lors de la soumission de l'évaluation:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};




exports.getJuryEvaluation = async (req, res) => {
  try {
      const { applicationId, juryId } = req.query;

      // Recherche de l'évaluation contenant cette application et ce jury spécifique
      const evaluation = await Evaluation.findOne(
        { 
          application: applicationId, 
          "jurys.jury": juryId
        },
        //{"jurys.$":1}
      )
      .select("status")
      .select({ "jurys": { $elemMatch: { jury: juryId } } }) // Utilise $elemMatch pour filtrer
      .populate({ path: "application", model: Application }) // Charge l'application
      //.populate({ path: "application.user", model: User, select: "name email" }) // Charge l'utilisateur de l'application
      .populate({ path: "jurys.jury", model: User, select: "" }) // Charge le jury spécifique
      .populate({ path: "user", model: User, select: "" }) // Charge l'évaluateur principal
      
      if (!evaluation) {
          return res.status(404).json({ message: "Aucune évaluation trouvée pour ce jury et cette application." });
      }

      //console.log([{...evaluation, jurys:evaluation.jurys[0]} ])
      //console.log(evaluation[0].jurys.length)
      // Extraction du seul élément du tableau "jurys"
      //const juryEvaluation = evaluation[0].jurys[0];

      res.status(200).json({message:"success", data:[evaluation,] });
  } catch (error) {
      console.error("Erreur lors de la récupération de l'évaluation du jury :", error);
      res.status(500).json({ message: "Erreur serveur" });
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
exports.getAdminEvaluations = async (req, res) => {
  //console.log("req.body")
  try {
    const { adminId } = req.params
    const evaluations = await Evaluation.find()
    .populate({
      path: "application",
      match: { admin: adminId }, // Filtrer les applications gérées par cet admin
    })
      .populate("user")
      .populate("jurys.jury");
      const filteredEvaluations = evaluations.filter(evaluation => evaluation.application);

    res.status(200).json({message:"success", data:filteredEvaluations});
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
