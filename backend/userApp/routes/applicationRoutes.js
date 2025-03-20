const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

//router.post("/create", applicationController.createAnnouncement);
router.get("/jury/:juryId", applicationController.getJuryApplications);

router.get("/get/all", applicationController.getApplications);
router.get("/user/get/", applicationController.getUserApplications);

router.put("/jury/assign", applicationController.assignJuriesToApplication);
router.put("/update/decision", applicationController.updateApplicationStatus);
//router.get("/jury/:juryId", applicationController.getJuryApplications);
//router.get("/:id", announcementController.getAnnouncementById);
//router.get("/user/:userId", announcementController.getAnnouncementsPostedBy);

//router.put("/:id", announcementController.updateAnnouncement);
//router.delete("/:id", announcementController.deleteAnnouncement);

module.exports = router;
