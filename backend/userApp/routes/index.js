const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const announcementRoutes = require('./announcementRoutes');
const applicationRoutes = require('./applicationRoutes');
const evaluationRoutes = require('./evaluationRoutes');
const activityRoutes = require('./activityRoutes');
const facultyRoutes = require('./facultyRoutes');
//const cashierRoutes = require('./cashierRoutes');

//router.use('/products', auth,  productRoutes);
router.use('/announcements', announcementRoutes);
router.use('/applications', applicationRoutes);
router.use('/evaluations', evaluationRoutes);
router.use('/activities', activityRoutes);
router.use('/faculties', facultyRoutes);



module.exports = router;


