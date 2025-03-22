require('dotenv').config({ path: '../../shared/.env' });
const mongoose = require('mongoose');
const Notification = require('../models/notificationModel'); 
const User = require('../models/userModel');

const twilio = require('twilio');

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendSms = async (to, message) => {
    try {
        const response = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to,
        });
        console.log("SMS envoyé avec succès :", response.sid);
        return response;
    } catch (error) {
        console.error("Erreur lors de l'envoi du SMS :", error.message);
        throw error;
    }
};




exports.createNotification = async ({ user, source, title, message, action, read = 0 }) => {
  try {
    // Vérifier si l'utilisateur existe
    const existingUser = await User.findById(user);
    if (!existingUser) {
      throw new Error('Utilisateur non trouvé');
    }

    // Créer la nouvelle notification
    const newNotif = {
      _id: new mongoose.Types.ObjectId(),
      source: source || 'app',
      title,
      message,
      action,
      read,
      updatedAt: new Date(),
    };

    // Trouver les notifications existantes pour cet utilisateur
    let userNotifications = await Notification.findOne({ user });

    if (userNotifications) {
      userNotifications.notifications.push(newNotif);
      userNotifications.updatedAt = new Date();
    } else {
      // Si l'utilisateur n'a pas encore de notifications, créer une nouvelle entrée
      userNotifications = new Notification({
        user,
        notifications: [newNotif],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Sauvegarder la mise à jour ou le nouveau document
    await userNotifications.save();

    return {
      message: 'Notification créée avec succès',
      notification: newNotif,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors de la création de la notification: ' + error.message);
  }
};


