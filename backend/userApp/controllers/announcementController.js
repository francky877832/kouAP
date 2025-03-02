const mongoose = require('../../shared/db').mongoose;


const Announcement = require("../models/announcementModel");
const User = require('../models/userModel');
const ObjectId = mongoose.Types.ObjectId;



// Créer une nouvelle annonce
exports.createAnnouncement = async (req, res) => {
    console.log("Add-Annou")
  try {
    const { title, description, position, faculty, department, deadline } = req.body;

    // Vérifier que tous les champs sont remplis
    if (!title || !description || !position || !faculty || !department || !deadline) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newAnnouncement = new Announcement({
      title,
      description,
      position,
      faculty,
      department,
      deadline,
    });

    await newAnnouncement.save();
    res.status(201).json({ message: "Announcement created successfully!", announcement: newAnnouncement });
  } catch (error) {
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

// Récupérer une annonce par ID
exports.getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findById(id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found." });
    }

    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
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
