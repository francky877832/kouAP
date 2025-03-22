const express = require('express');
const router = express.Router();

const notificaitonCtrl = require('../controllers/notificationController');
const twiloCtrl = require('../controllers/twiloController');


//Notification route
router.get('/get/:user', notificaitonCtrl.getUserNotifications);
router.get('/count/:userId', notificaitonCtrl.countUserUnreadNotifications);
//router.post('/add', notificaitonCtrl.addUserNotification);
router.put('/update/read', notificaitonCtrl.updateUserNotificationRead);
router.put('/update/:userId', notificaitonCtrl.updateUserNotifications);
router.delete('/delete', notificaitonCtrl.deleteNotification);



//twilo
router.post('/twilo/send/sms', twiloCtrl.sendTwiloSms);
router.post('/twilo/send/multiUser', twiloCtrl.sendTwiloSmsToMultiUser);
router.post('/twilo/send/multiMessages', twiloCtrl.sendTwiloSmsWithMuliMessages);



module.exports = router;