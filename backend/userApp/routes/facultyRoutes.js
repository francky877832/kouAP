const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

router.get('/get', facultyController.getFaculties);
router.get('/get/groups', facultyController.getFacultyGroup);

module.exports = router;

