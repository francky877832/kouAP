const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");
const minActivityController = require("../controllers/minActivityController");
const minPointController = require("../controllers/minPointController");

//activity
router.post("/activity/create", activityController.createActivity);

//minActivity
router.post("/minActivity/create", minActivityController.createMinActivity);

//minPoint
router.post("/minPoint/create", minPointController.createMinPoint);




router.get('/activities', activityController.getAllActivities);
router.get('/activities/:id', activityController.getActivityById);
router.put('/activities/:id', activityController.updateActivity);
router.delete('/activities/:id', activityController.deleteActivity);


module.exports = router;
