const express = require("express");
const router = express.Router();
const minActivityController = require("../controllers/minActivityController");

router.post("/activity/create", minActivityController.createMinActivity);
router.get("/", minActivityController.getAllMinActivities);
router.get("/:id", minActivityController.getMinActivityById);
router.put("/:id", minActivityController.updateMinActivity);
router.delete("/:id", minActivityController.deleteMinActivity);

module.exports = router;
