const mongoose = require('../../shared/db').mongoose;
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');
const User = require('./userModel')
//modele pour les notificaitons
//
const notificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: User, required: true },
    //user: { type : String, required : true, unique : true },
    notifications : [{
            _id: { type: Schema.Types.ObjectId, required: true},
            source : { type : String, enum: ['app', 'admin', 'jury', 'manager', 'user'], defualt : "app", required : false },
            //model : { type : String, enum: ['normal', 'campagne', 'suggestion', 'modal', 'user', 'products', 'offers', 'orders', 'comments', 'admin'], default : "products", required : false },
            
            title : { type : String, required : true, },
            message : { type : String, required : true },
            //type : { type : String, required : true, default:'on_new_like' },
            action : { type : String, required : true },
            read : { type : Number, enum: [0, 1], default : 0, required : true },
            createdAt : { type : Date, default : Date.now },
            updatedAt : { type : Date, default : Date.now },
    }],
    
    createdAt : { type : Date, default : Date.now },
    updatedAt : { type : Date, default : Date.now },
},  { versionKey: false });


notificationSchema.plugin(uniqueValidator);

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

module.exports = Notification;
