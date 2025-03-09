const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../models/userModel')
const Activity = require('../models/activityModel')

const db = mongoose.connection.useDb("kouap");



const FormSchema = new mongoose.Schema({
    activity: { type: mongoose.Schema.Types.ObjectId, ref: Activity, default: null },
    letter: { type: String, required: true, unique: true },
    fields : [
        {
            name: { type: String, required: true },
            label: { type: String, required: true },
            type: { type: String, required: true },
            options: { type: [String], default: undefined,
                validate: {
                    validator: function (value) {
                      return this.type !== 'checkbox' && this.type !== 'radio' ? true : Array.isArray(value) && value.length > 0;
                    },
                    message: "L'option est requise pour les champs de type 'checkbox' ou 'radio'.",
                  },
            },
        }
    ],
});

module.exports = db.model("Form", FormSchema);