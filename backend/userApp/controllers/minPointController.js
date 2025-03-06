
const Activity = require('../models/activityModel');

const mongoose = require('../../shared/db').mongoose;

const User = require('../models/userModel');

const ObjectId = mongoose.Types.ObjectId;
const { Types } = mongoose;

const MinPoint = require("../models/minPointModel");

// 📌 Créer une MinActivity
exports.createMinPoint = async (req, res, next) => {
    //console.log('okok')
    try {
        console.log(req.body)

        //const activityId = "67c776634035a02db2ee38e0";
        const { letter, range, from, to, criteria, position, minPoint, maxPoint, faculty } = req.body;
// 
        if ((range && (!from || !to || !letter)) || (!range && !criteria)  || !position || !minPoint || !maxPoint || !faculty) {
            console.log("Tous les champs sont requis.")
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }
        const positions = {
            position,
            minPoint,
            faculty,
            maxPoint,
        }
        //console.log("req.body")

        const newActivity = new MinPoint({ letter, range, from, to, criteria, positions:[positions,] });
        const savedActivity = await newActivity.save();
        console.log(savedActivity)
        res.status(201).json({ message: "success", activity: savedActivity });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};




