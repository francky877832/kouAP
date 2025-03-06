const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");
const minActivityController = require("../controllers/minActivityController");
const minPointController = require("../controllers/minPointController");

//activity
router.post("/activity/create", activityController.createActivity);
router.put('/activity/update/:activityId', activityController.updateActivity);
router.delete('/activity/delete/:activityId', activityController.deleteActivity);


//minActivity
router.post("/minActivity/create", minActivityController.createMinActivity);

//minPoint
router.post("/minPoint/create", minPointController.createMinPoint);

//update activity




router.get('/activities/all', activityController.getAllActivities);
router.get('/activities/:id', activityController.getActivityById);
router.put('/activities/:id', activityController.updateActivity);


module.exports = router;
