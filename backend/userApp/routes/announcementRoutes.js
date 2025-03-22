const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController");

const auth  = require("../middlewares/auth");


router.post("/create", auth, announcementController.createAnnouncement);
router.get("/get", announcementController.getAllAnnouncements);
//router.get("/:id", announcementController.getAnnouncementById);
router.get("/user/:userId", auth, announcementController.getAnnouncementsPostedBy);

router.get("/page", announcementController.getAnnouncementsByPage);

router.put("/:id", auth, announcementController.updateAnnouncement);
router.delete("/:id", auth, announcementController.deleteAnnouncement);

module.exports = router;
