const mongoose = require('../../shared/db').mongoose;
const Application = require('../models/applicationModel');
const User = require('../models/userModel');
const evaluationController = require('../controllers/evaluationController');
const { sendSms, createNotification, sendBrevoEmail } = require('../utils/twilo')
const { notifyThroughAllCanals } = require('../utils/utilsFonctions')

require('dotenv').config({ path: '../../shared/.env' });



exports.getApplications = async (req, res, next) => {

  //console.log("req.body")
    try {
  
      const applications = await Application.find({status:"pending"})
        .populate('user')
        .populate('jurys')
  
      res.status(200).json({message:"succes", data:applications});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération des applications" });
    }

  };

  exports.getUserApplications = async (req, res, next) => {
    //console.log(req.params)
      try {
        const { userId } = req.params
    
        const applications = await Application.find({user:userId})
          .populate('user')
          .populate('admin')
          .populate('announcement')
          .populate('jurys')
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
    //const allJurors = await User.find({ role: "jury" });
    const allJurors = await User.find({ role: { $in: ["jury", "dev"] } });


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
    const selectedJurorsId = selectedJurors.map(jury => jury._id);
    application.jurys = selectedJurorsId;
    application.status = 'processing';
    application.admin = adminId;
    const newApplication = await application.save();

    //selectedJurors
    const message =  `An admin of ${process.env.APP_NAME} just assigned an application to you.`
    const jurorsEmails = selectedJurors.map(j => ({email:j.email, name:j.name}))
      
    
      //selectedJurors.map(async(j) => await sendSms(j?.phoneNumber, message));
      await sendBrevoEmail(process.env.BREVO_EMAIL_SENDER, process.env.APP_NAME, jurorsEmails, "New Application", message)
                    //console.log(req)
      selectedJurors.map(async (j) => {
        const data = { user:j?._id, source:'app', title:'New Application', message, action:'/jury/panel', read:0}
        return  await createNotification({...data});
      })
    

    //await evaluationController.createEvaluation({...req, params:{applicationId, userId, jurys:selectedJurorsId}}, res)
    return res.status(200).json({ message: "success", data:newApplication });


  } catch (error) {
    console.error("Erreur lors de l'assignation des jurés:", error);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
};



exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params; // ID de l'application
    const { status, comment } = req.body; // "approved" ou "rejected"
    let newStatus = "accepted" ? "approved" : status

//console.log(req.body)
    // Vérification des valeurs autorisées
    if (!["approved", "accepted", "rejected"].includes(newStatus)) {
      return res.status(400).json({ message: "Statut invalide. Utilisez 'approved' ou 'rejected'." });
    }
    // Trouver et mettre à jour l'application
    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status : newStatus, comment, updatedAt: Date.now() },
      { new: true }
    ).populate("user");
    //const application = {}

    if (!application) {
      return res.status(404).json({ message: "Application non trouvée." });
    }
    const user = application.user

    const message = `Your application from ${process.env.APP_NAME} have been updated with the status : ${application.status} and the comment : ${comment}`
    const title = "Application Status Updated"

    await notifyThroughAllCanals(title, message, [{email:user.email, name:user.name}], user, '/user/panel', 'app')
      

    

    return res.status(200).json({ message: `Statut mis à jour avec succès : ${application.status}`, data : application });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
};



  

// ✅ 1. Créer une nouvelle application
exports.createApplication = async (req, res) => {
  try {
   
    const { user, categories, submittedOn, status, jurys, announcement, admin, titleToNote } = req.body;
    const categorys = JSON.parse(categories)
    let newCat = {}
    let applicationDocument = ""
    const files = req.files;
    //console.log(categorys)
    files.forEach(f => {
      const activity = f.originalname.split('.')[0]
      if(activity.length===2)
      {
        const number = parseInt(activity.slice(1));
        let letter = activity.slice(0, 1);
        //console.log(activity, letter, index)

        const act = categorys[letter]
        newCat = act.map((a, index) => {
          if(a.number == number)
          {
            return {...a, proof:f.location,}
          }
          if (!!a.cases) return { ...a, cases: new mongoose.Types.ObjectId(a.cases) };
          return {...a}
        })
        categorys[letter] = newCat
      }
      else
      {
        applicationDocument = f.location
      }
    })
    //console.log(req.files)
    const newApplication = new Application({
      user,
      categories : categorys ,
      submittedOn,
      status,
      jurys,
      announcement, admin,
      applicationDocument,
      titleToNote,
    });

   const savedApplication = await newApplication.save();
    //const savedApplication = {}

    const admins = await User.find({ role: { $in: ["admin", "dev"] } });
    const adminsEmail = admins.map(a => ({email:a.email, name:a.name}))
    const message = `An announcement from ${process.env.APP_NAME} just got a new Application.`
    const title = "New Application Submitted"

    await notifyThroughAllCanals(title, message, adminsEmail, admins, '/admin/panel', 'app')
      
    res.status(200).json({message:"success", data:savedApplication});
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
      .populate('user')
      .populate('jurys');

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
