const mongoose = require('../../shared/db').mongoose;


const User = require('../models/userModel');
const Announcement = require("../models/announcementModel");
const Application = require("../models/applicationModel");
const { sendSms, sendBrevoEmail } = require('../utils/twilo');


const ObjectId = mongoose.Types.ObjectId;

const { Types } = mongoose;

// Créer une nouvelle annonce
exports.createAnnouncement = async (req, res, next) => {
    //console.log(req.body)
  try {

   /* const newApplication = new Application({
      user: new Types.ObjectId("67c40819dd1edec92edce9f2"), // Convertir en ObjectId
      categories: {
        A1: {
          title: "XXXXX",
          author: "Francky",
          cv: "www.google.com"
        }
      },
      submittedOn: new Date(1740862800000), // Convertir le timestamp en date
      status: "pending",
      jurys: [
        new Types.ObjectId("67c40819dd1edec92edce9f2"), // Convertir en ObjectId pour chaque jury
      ]
    }).save()*/

    const { title, description, position, faculty, department, deadline, startingDate, postedBy } = req.body;

    // Vérifier que tous les champs sont remplis
    if (!title || !description || !position || !faculty || !deadline || !startingDate || !postedBy) {
      return res.status(400).json({ message: "All fields are required." });
    }

    /*const newUser = new User({ name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      title: 'Professor',
      role: 'user'});

    // Enregistre l'utilisateur dans la base de données
    const savedUser = await newUser.save();*/

    const newAnnouncement = new Announcement({
      title,
      description,
      position,
      faculty,
      department,
      deadline,
      startingDate,
      postedBy,
    });

    await newAnnouncement.save();
    res.status(201).json({ message: "Announcement created successfully!", announcement: newAnnouncement });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Récupérer toutes les annonces
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};


exports.getAnnouncementsByPage = async (req, res) => {
  try {

    //console.log(req.query)
      const { page = 1, limit = 10 } = req.query;

      /*
      const announcements = await Announcement.find()
          .populate('postedBy')
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(parseInt(limit));
      */

      const announcements = await Announcement.aggregate([
        {
          $match: {
            deadline: { $gt: new Date() } 
          }
        },
            {
              $lookup: {
                from: 'departments',
                localField: 'department',
                foreignField: '_id',
                as: 'department'
              }
            },
            {
              $unwind: {
                path: '$department',
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $lookup: {
                from: 'faculties',
                localField: 'department.faculty',
                foreignField: '_id',
                as: 'department.faculty'
              }
            },
            {
              $unwind: {
                path: '$department.faculty',
                preserveNullAndEmptyArrays: true
              }
            },
            // Stage 3: Tri par createdAt
            {
              $sort: { createdAt: -1 }
            },
            // Stage 4: Pagination
            {
              $skip: (page - 1) * limit
            },
            {
              $limit: parseInt(limit)
            }
          ]);
        //console.log(announcements)

      const total = await Announcement.countDocuments();
      //console.log(total)
      res.status(200).json({
          total : total,
          page: parseInt(page),
          totalPages: Math.ceil(total / limit),
          data: announcements
      });
  } catch (error) {
    console.log(error)
      res.status(500).json({ error: error.message });
  }
};



// Récupérer une annonce par ID
exports.getAnnouncementsPostedBy = async (req, res) => {
  try {
    const { userId } = req.params;

    // Vérifier si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID utilisateur invalide" });
    }
/*
    // Trouver les annonces de cet utilisateur
    const announcements = await Announcement.aggregate([
      {
        $match: { 
          postedBy: new mongoose.Types.ObjectId(userId) 
        }
      },
      {
        $lookup: {
          from: 'departments',
          localField: 'department',
          foreignField: '_id',
          as: 'department'
        }
      },
      {
        $unwind: {
          path: '$department',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'faculties',
          localField: 'department.faculty',
          foreignField: '_id',
          as: 'department.faculty'
        }
      },
      {
        $unwind: {
          path: '$department.faculty',
          preserveNullAndEmptyArrays: true
        }
      },
      // Stage 3: Tri par createdAt
      {
        $sort: { createdAt: -1 }
      },
    ]);
*/
    const announcements = await Announcement.find().populate('faculty')
    //console.log(announcements)

    if (!announcements || announcements.length === 0) {
      return res.status(404).json({ message: "Aucune annonce trouvée pour cet utilisateur." });
    }

    res.status(200).json({ message: "Success", data: announcements });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};


// Mettre à jour une annonce
exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found." });
    }

    res.status(200).json({ message: "Announcement updated successfully!", announcement: updatedAnnouncement });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Supprimer une annonce
exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found." });
    }

    res.status(200).json({ message: "Announcement deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
