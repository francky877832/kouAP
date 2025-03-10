const express = require("express");
const router = express.Router();
const caseController = require("../controllers/caseController");
const coefController = require("../controllers/coefController");


//case
router.get("/case/all", caseController.getAllCases);
router.get("/case/:id", caseController.getCaseById);
router.post("/case/create", caseController.createCase);
router.put("/case/update/:id", caseController.updateCase);
router.delete("/case/delete/:id", caseController.deleteCase);


// 🔹 Routes pour les coefs
router.get("/coef/all", coefController.getAllCoefs);
router.get("/coef/:id", coefController.getCoefById);
router.post("/coef/create", coefController.createCoef);
router.put("/coef/update/:id", coefController.updateCoef);
router.delete("/coef/delete/:id", coefController.deleteCoef);



module.exports = router;
