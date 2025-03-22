const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController");

const auth  = require("../middlewares/auth");


router.post("/create", announcementController.createAnnouncement);
router.get("/get", announcementController.getAllAnnouncements);
//router.get("/:id", announcementController.getAnnouncementById);
router.get("/user/:userId", announcementController.getAnnouncementsPostedBy);

router.get("/page", announcementController.getAnnouncementsByPage);

router.put("/:id", announcementController.updateAnnouncement);
router.delete("/:id", announcementController.deleteAnnouncement);

module.exports = router;
