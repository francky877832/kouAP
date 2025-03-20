const express = require('express');
const router = express.Router();

const { cvUpload } = require("../middlewares/multer-config");


const userCtrl = require('../controllers/userController');


//User Route
router.get("/get/all", userCtrl.getUsers);

router.post("/control", userCtrl.controlUser);
router.post("/signUp", cvUpload.single("cv"), userCtrl.signupUser);
router.post("/login", userCtrl.loginUser);
router.put("/user/update", cvUpload.single("cv"), userCtrl.updateUser);
router.put("/role/update/:userId", userCtrl.updateUserRole);




module.exports = router;