const Notification = require('../models/NotificationModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');


exports.createNotification = async (req, res) => {
  try {
    const { user, source, model, title, message, type, action, read } = req.body;

    // Vérifier si l'utilisateur existe
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Créer la nouvelle notification
    const newNotif = {
      _id: new mongoose.Types.ObjectId(),
      source: source || 'app',
      title,
      message,
      action,
      read: read || 0,
      updatedAt: new Date(),
    };

    let userNotifications = await Notification.findOne({ user });

    if (userNotifications) {
      userNotifications.notifications.push(newNotif);
      userNotifications.updatedAt = new Date();
    } else {
      userNotifications = new Notification({
        user,
        notifications: [newNotif],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Sauvegarder la mise à jour ou le nouveau document
    await userNotifications.save();

    return res.status(201).json({
      message: 'Notification créée avec succès',
      notification: newNotif,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la création de la notification', error: error.message });
  }
};


// Récupérer toutes les notifications d'un utilisateur
exports.getUserNotifications = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;  // Page actuelle (par défaut 1)
      const limit = parseInt(req.query.limit) || 10;  // Limite de notifications par page (par défaut 10)
  
      // Récupérer toutes les notifications de l'utilisateur
      const notifications = await Notification.find({ user: req.params.user })
        .populate('user'); // Populer l'utilisateur si nécessaire
  
      if (!notifications.length) {
        return res.status(404).json({ error: 'Aucune notification trouvée pour cet utilisateur' });
      }
  
      // Appliquer la pagination sur le tableau des notifications
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      // Notifications paginées
      const paginatedNotifications = notifications.slice(startIndex, endIndex);
  
      // Nombre total de notifications pour le calcul du nombre de pages
      const totalNotifications = notifications.length;
      const totalPages = Math.ceil(totalNotifications / limit);
      //console.log(paginatedNotifications)
  
      return res.status(200).json({
        message: "Success",
        data: {
          notifications: paginatedNotifications[0].notifications,
          totalNotifications,
          totalPages,
          currentPage: page,
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la récupération des notifications', error: error.message });
    }
  };
  


exports.countAllUnreadNotifications = async (req, res, next) => {
    try {
      const { user } = req.params; 
  
      const unreadNotifications = await Notification.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(user) } }, 
        { $unwind: "$notifications" }, 
        { $match: { "notifications.read": 0 } }, 
        { $count: "unreadCount" }, 
        {
          $addFields: {
            unreadCount: { $ifNull: ["$unreadCount", 0] } 
          }
        }
      ]);
  
      const notifCount = unreadNotifications.length > 0 ? unreadNotifications[0].unreadCount : 0;
  
      const total = notifCount; 
  
      return res.status(200).json({ message: "success", data: total });
      
    } catch (error) {
      console.error("Erreur lors du comptage des notifications non lues :", error);
      return res.status(400).json({ error });
    }
  };
  
  
// Récupérer une notification spécifique par son ID
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification non trouvée' });
    }
    return res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la récupération de la notification', error: error.message });
  }
};


// Mettre à jour une notification spécifique en la marquant comme lue
exports.updateUserNotificationRead = async (req, res) => {
    try {
      console.log(req.body)
      const { userId, notificationId } = req.body;
  
      // Trouver la notification pour cet utilisateur
      const notification = await Notification.findOne({
        'user': userId,
        'notifications._id': notificationId
      });
  
      if (!notification) {
        return res.status(404).json({ message: 'Notification non trouvée pour cet utilisateur' });
      }
  
      // Mettre à jour le statut 'read' de la notification
      const notificationIndex = notification.notifications.findIndex(
        (notif) => notif._id.toString() === notificationId
      );
  
      if (notificationIndex !== -1) {
        notification.notifications[notificationIndex].read = 1;
        notification.notifications[notificationIndex].updatedAt = new Date();
        await notification.save();
        return res.status(200).json({
          message: 'Notification mise à jour comme lue avec succès',
          notification: notification.notifications[notificationIndex],
        });
      }
  
      return res.status(404).json({ message: 'Notification non trouvée' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur lors de la mise à jour de la notification', error: error.message });
    }
  };

  
  // Mettre à jour toutes les notifications de l'utilisateur comme lues
  exports.updateUserNotifications = async (req, res) => {
    try {
      //console.log( req.body)
        const { userId } = req.params;
        const { notificationId, newNotification } = req.body;

        // Trouver le document Notification correspondant à l'utilisateur
        const notificationDoc = await Notification.findOne({ user: userId });

        if (!notificationDoc) {
            return res.status(404).json({ message: "Aucune notification trouvée pour cet utilisateur" });
        }

        // Trouver l'index de la notification à mettre à jour
        const index = notificationDoc.notifications.findIndex(notif => notif._id.toString() === notificationId);
        if (index === -1) {
            return res.status(404).json({ message: "Notification non trouvée" });
        }

        // Mettre à jour la notification dans le tableau
        notificationDoc.notifications[index] = {
            ...notificationDoc.notifications[index],  // Conserver les anciennes valeurs
            ...newNotification,  // Remplacer par les nouvelles valeurs
            updatedAt: new Date(), // Mettre à jour la date de modification
        };

        // Sauvegarder les modifications
        await notificationDoc.save();

        return res.status(200).json({
            message: "Notification mise à jour avec succès",
            data: notificationDoc.notifications[index],
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur lors de la mise à jour de la notification", error: error.message });
    }
};

  
// Mettre à jour une notification
exports.updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification non trouvée' });
    }

    // Mise à jour des champs de la notification
    notification.notifications[0].read = req.body.read || notification.notifications[0].read;
    notification.notifications[0].message = req.body.message || notification.notifications[0].message;
    notification.notifications[0].updatedAt = new Date();

    await notification.save();
    return res.status(200).json({
      message: 'Notification mise à jour avec succès',
      notification: notification,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour de la notification', error: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    //console.log(req.body)
    const { userId, notificationId } = req.body;

    // Vérifier si les paramètres nécessaires sont fournis
    if (!userId || !notificationId) {
      return res.status(400).json({ message: "userId et notificationId sont requis" });
    }

    // Trouver le document Notification de l'utilisateur
    const notificationDoc = await Notification.findOne({ user: userId });

    if (!notificationDoc) {
      return res.status(404).json({ message: "Aucune notification trouvée pour cet utilisateur" });
    }

    const newNotifications = notificationDoc.notifications.filter(notif => notif._id.toString() !== notificationId);

    if (newNotifications.length === notificationDoc.notifications.length) {
      return res.status(404).json({ message: "Notification non trouvée" });
    }

    notificationDoc.notifications = newNotifications;
    notificationDoc.updatedAt = new Date();
    await notificationDoc.save();

    return res.status(200).json({ 
      message: "Notification supprimée avec succès", 
      data: notificationDoc.notifications 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la suppression de la notification", error: error.message });
  }
};

