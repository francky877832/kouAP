const express = require('express');
const router = express.Router();

const { cvUpload } = require("../middlewares/multer-config");


const userCtrl = require('../controllers/userController');


//User Route
router.get("/users/get/all", userCtrl.getUsers);

router.post("/control", userCtrl.controlUser);
router.post("/signUp", cvUpload.single("cv"), userCtrl.signupUser);
router.post("/login", userCtrl.loginUser);
router.put("/update", cvUpload.single("cv"), userCtrl.updateUser);




module.exports = router;