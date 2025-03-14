const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");
const minActivityController = require("../controllers/minActivityController");
const minPointController = require("../controllers/minPointController");

//activity
router.post("/activity/create", activityController.createActivity);
router.put('/activity/update/:activityId', activityController.updateActivity);
router.delete('/activity/delete/:activityId', activityController.deleteActivity);
router.get('/activities/all', activityController.getAllActivities);

//minActivity
router.post("/minActivity/create", minActivityController.createMinActivity);
router.get('/minActivities/all', minActivityController.getAllMinActivities);
router.put('/minActivity/update/:id', minActivityController.updateMinActivity);
router.delete('/minActivity/delete/:id', minActivityController.deleteMinActivity);

//minPoint
router.post("/minPoint/create", minPointController.createMinPoint);
router.get('/minPoints/all', minPointController.getAllMinPoints);

//router.put('/minPoint/update/:id', minActivityController.updateMinPoints);
//router.delte('/minPoint/delete', minPointController.deleteMinPoint);



//update activity





router.get('/activities/:id', activityController.getActivityById);
router.put('/activities/:id', activityController.updateActivity);


module.exports = router;
