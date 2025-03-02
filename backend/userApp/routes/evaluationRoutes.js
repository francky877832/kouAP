const express = require("express");
const router = express.Router();
const { evaluationDocsUpload } = require("../middlewares/multer-config");

const EvaluationController = require("../controllers/evaluationController");

router.post("/add/:applicationId", evaluationDocsUpload.single("reportFile"), EvaluationController.createEvaluation);


module.exports = router;
