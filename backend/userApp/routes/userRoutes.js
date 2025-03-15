const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userController');


//User Route


router.get("/auth", userCtrl.redirectForLogin);
router.get("/callback", userCtrl.getAccessToken);
router.get("/userinfo", userCtrl.getPersonInfo);

router.post("/control", userCtrl.controlUser);



module.exports = router;