const express = require('express');
const router = express.Router();

const { cvUpload } = require("../middlewares/awsMiddleware");
const auth = require("../middlewares/auth");


const userCtrl = require('../controllers/userController');


//User Route
router.get("/get/all", auth,  userCtrl.getUsers);

router.post("/control", userCtrl.controlUser);
//router.post("/signUp",  cvUpload.single("cv"), userCtrl.signupUser);
router.post("/signUp",  cvUpload.fields([
                            { name: "cv", maxCount: 1 },
                            { name: "signature", maxCount: 1 },
                        ]), userCtrl.signupUser);


router.post("/login", userCtrl.loginUser);

router.put("/user/update", auth, cvUpload.single("cv"), userCtrl.updateUser);
router.put("/role/update/:userId", auth, userCtrl.updateUserRole);




module.exports = router;