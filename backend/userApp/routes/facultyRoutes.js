const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

router.get('/get', facultyController.getFaculties);

module.exports = router;

