const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

//const { applicationsDocUpload } = require("../middlewares/multer-config");
const { applicationsDocUpload } = require("../middlewares/awsMiddleware");




//const fileNames = Array.from({ length: 14 }, (_, i) => `file${String.fromCharCode(65+i)}`);

//router.post("/create", applicationController.createAnnouncement);
router.get("/jury/:juryId", applicationController.getJuryApplications);

router.get("/get/all", applicationController.getApplications);
router.get("/user/get/:userId", applicationController.getUserApplications);

router.post("/apply", applicationsDocUpload.array("files[]"), applicationController.createApplication);


router.put("/jury/assign", applicationController.assignJuriesToApplication);
router.put("/update/decision/:applicationId", applicationController.updateApplicationStatus);


module.exports = router;
