const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userController');


//User Route



router.get("/callback", userCtrl.getAccessToken);
router.get("/userinfo", userCtrl.getPersonInfo);

router.post("/control", userCtrl.controlUser);
router.post("/signUp", userCtrl.signupUser);



module.exports = router;