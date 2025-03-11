const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.get('/get/all', formController.getForms);
router.post('/create', formController.createForm);
router.put('/update/:id', formController.updateForm);
router.delete('/delete/:id', formController.deleteForm);

module.exports = router;

