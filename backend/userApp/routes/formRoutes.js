const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.get('/get/all', formController.getForms);

module.exports = router;

