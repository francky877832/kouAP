const express = require('express');
const router = express.Router();

const notificaitonCtrl = require('../controllers/notificationController');


//Notification route
router.get('/get/:user', notificaitonCtrl.getUserNotifications);
router.get('/count/:user', notificaitonCtrl.countAllUnreadNotifications);
//router.post('/add', notificaitonCtrl.addUserNotification);
router.put('/update/read', notificaitonCtrl.updateUserNotificationRead);
router.put('/update/:userId', notificaitonCtrl.updateUserNotifications);
router.delete('/delete', notificaitonCtrl.deleteNotification);


module.exports = router;