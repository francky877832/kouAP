const express = require("express");
const router = express.Router();
const { evaluationDocsUpload } = require("../middlewares/awsMiddleware");

const EvaluationController = require("../controllers/evaluationController");

router.post("/add", evaluationDocsUpload.single("report"), EvaluationController.createEvaluation);
router.get("/get/jury", EvaluationController.getJuryEvaluation);
router.get("/get/admin/:adminId", EvaluationController.getAdminEvaluations);




module.exports = router;
